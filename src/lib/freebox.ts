import { HmacSHA1 } from "crypto-js";
import { Response } from "../@types/response";
import { App, Configuration, LoginStatus } from "../@types/app";
import sleep from "../utils/sleep";
import get, { post } from "../utils/fetch";
import Freeplug, { Member } from "../@types/freeplug";
import DHCP from "../@types/dhcp";
import Port from "../@types/port";
import { Wifi } from "./wifi";
import log4js from "log4js";
import { LAN } from "./lan";
import { Connection } from "./connection";

class Freebox {
  public wifi: Wifi;
  public LAN: LAN;
  public connection: Connection;

  private logger = log4js.getLogger("Freebox");
  public _configuration?: Configuration = {
    baseUrl: "http://mafreebox.freebox.fr/api/v11",
  };
  public _app: App;
  public token: string = "";

  constructor(app: Pick<App, "app_id" | "app_name" | "app_version" | "device_name" | "app_token">) {
    this._app = app;
    this.logger.level = "fatal";
    if (!this._app.app_id) {
      throw new Error("app_id must be defined in the app object");
    } else if (!this._app.app_name) {
      throw new Error("app_name must be defined in the app object");
    } else if (!this._app.app_version) {
      throw new Error("app_version must be defined in the app object");
    } else if (!this._app.device_name) {
      throw new Error("device_name must be defined in the app object");
    }
  }

  async login() {
    if (this._app.app_token) {
      this.logger.info("app_token already defined");
      this._app.app_token = this._app.app_token;
    } else {
      const reqAuthorization = (await fetch(`${this._configuration?.baseUrl}/login/authorize/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          app_id: this._app.app_id,
          app_name: this._app.app_name,
          app_version: this._app.app_version,
          device_name: this._app.device_name,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          return json as any;
        })
        .catch((error) => {
          this.logger.error("🚀 ~ error", error);
        })) as Response<{
        app_token: string;
        track_id: string;
      }>;

      this._app.app_token = reqAuthorization.result.app_token;
      reqAuthorization.success = false;

      while (!reqAuthorization.success) {
        this.logger.info(
          `Please accept the authorization request on your Freebox Server with token : ${reqAuthorization.result.app_token}`
        );

        const checkAuthorization = await fetch(
          `${this._configuration?.baseUrl}/login/authorize/${reqAuthorization.result.track_id}`
        )
          .then((res) => res.json())
          .then((json) => {
            return json as any as {
              success: boolean;
              result: {
                status: keyof typeof LoginStatus;
                challenge: string;
              };
            };
          });

        switch (checkAuthorization.result.status) {
          case "unknown":
            throw new Error("the app_token is invalid or has been revoked");
          case "pending":
            this.logger.info("the user has not confirmed the authorization request yet");
            break;
          case "timeout":
            throw new Error("the user did not confirmed the authorization within the given time");
          case "granted":
            this.logger.info("the app_token is valid and can be used to open a session");
            reqAuthorization.success = true;
            this._app.app_token = reqAuthorization.result.app_token;
            break;
          case "denied":
            throw new Error("the user denied the authorization request");
          default:
            throw new Error("Unknown error");
        }

        await sleep();
      }
    }

    const challenge = await fetch(`${this._configuration.baseUrl}/login/`).then((res) => res.json());
    const password = HmacSHA1(challenge.result.challenge, this._app.app_token).toString();
    const reqSession = await fetch(`${this._configuration.baseUrl}/login/session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: this._app.app_id,
        password,
      }),
    }).then((res) => res.json());
    this._app.session_token = reqSession.result.session_token;
    this.token = this._app.session_token;
    this.logger.info("Logged in with sesion_token: ", this._app.session_token);

    this.wifi = new Wifi(this);
    this.LAN = new LAN(this);
    this.connection = new Connection(this);
  }

  async disk() {
    return await get(`${this._configuration.baseUrl}/storage/disk/`, this.token);
  }

  async getLanganges() {
    return await get(`${this._configuration.baseUrl}/lang/`, this.token);
  }

  async setLang(lang: string) {
    return await post(`${this._configuration.baseUrl}/lang/`, this.token, {
      body: {
        lang,
      },
    });
  }

  /**
   *
   * @param MAC Mac address of the freeplug
   * @returns Freeplug object if MAC is defined, else return an array of Freeplug
   * @description Get the current Freeplugs networks
   * @link http://mafreebox.freebox.fr/doc/index.html?v=b828168%E2%80%A6#freeplug-api
   */
  async freeplug(MAC: string = undefined): Promise<Response<typeof MAC extends never ? Member : Freeplug[]>> {
    return await get<typeof MAC extends never ? Member : Freeplug[]>(
      `${this._configuration.baseUrl}/freeplug/${MAC ?? ""}/`,
      this.token
    );
  }

  /**
   *
   * @param MAC Mac address of the host to wake up
   * @param _interface interface to use to send the magic packet
   */
  async wakeOnLan(MAC: string, /** reserved keywork "interface" */ _interface: string = "pub") {
    return await post(`${this._configuration.baseUrl}/lan/wol/${_interface}/`, this.token, {
      body: {
        mac: MAC,
        password: "",
      },
    });
  }

  async DHCP() {
    return await get<DHCP>(`${this._configuration.baseUrl}/dhcp/config/`, this.token);
  }

  async FTP() {
    return await get(`${this._configuration.baseUrl}/ftp/config/`, this.token);
  }

  async port<T = Port[]>(id?: number): Promise<Response<T>> {
    return await get<T>(
      id == undefined ? `${this._configuration.baseUrl}/fw/redir/` : `${this._configuration.baseUrl}/fw/redir/${id}`,
      this.token
    );
  }

  async LCD() {
    return await get(`${this._configuration.baseUrl}/lcd/config/`, this.token);
  }

  async share() {
    return await get(`${this._configuration.baseUrl}/netshare/samba/`, this.token);
  }

  async afp() {
    return await get(`${this._configuration.baseUrl}/netshare/afp/`, this.token);
  }

  async switch() {
    return await get(`${this._configuration.baseUrl}/switch/status/`, this.token);
  }

  // private get version() {
  //   return fetch(`${this._configuration.baseUrl}/api_version/`).then((res) =>res.json());
  // }
}

export { Freebox };
