import { HmacSHA1 } from "crypto-js";
import { App, Configuration as TConfiguration, LoginStatus } from "~freebox/@types/app";
import sleep from "~freebox/utils/sleep";
import { Wifi } from "./wifi";
import { LAN } from "./lan";
import { Connection } from "./connection";
import { Port } from "./port";
import request from "~freebox/utils/fetch";
import pino from "pino";
import { Player } from "./player";
import pretty from "pino-pretty";
import { Configuration } from "./configuration";

type OnLoginApp = Pick<App, "app_id" | "app_name" | "app_version" | "device_name" | "app_token" | "debug">;

class Freebox {
  public wifi: Wifi;
  public LAN: LAN;
  public connection: Connection;
  public port: Port;
  public player: Player;
  public configuration: Configuration;

  public request: typeof request;

  private readonly logger = pino(
    pretty({
      colorize: true,
      sync: true,
    })
  );

  public readonly _configuration?: TConfiguration = {
    baseUrl: "http://mafreebox.freebox.fr/api/v11",
  };
  public _app: App;
  public token: string = "";

  constructor(app: OnLoginApp) {
    this._app = app;
    this._app.debug ? (this.logger.level = "debug") : (this.logger.level = "info");
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
    this.logger.debug("Starting login process");
    if (this._app.app_token) {
      this.logger.info("app_token already defined using it to open a session");
      this._app.app_token = this._app.app_token;
    } else {
      const reqAuthorization = await request<
        {
          app_token: string;
          track_id: string;
        },
        OnLoginApp
      >(
        `${this._configuration?.baseUrl}/login/authorize/`,
        null,
        {
          body: {
            app_id: this._app.app_id,
            app_name: this._app.app_name,
            app_version: this._app.app_version,
            device_name: this._app.device_name,
          },
        },
        "POST"
      );

      this._app.app_token = reqAuthorization.result.app_token;
      reqAuthorization.success = false;

      while (!reqAuthorization.success) {
        this.logger.debug("Checking authorization status...");
        this.logger.info(
          `Please accept the authorization request on your Freebox Server with token : ${reqAuthorization.result.app_token}`
        );

        const checkAuthorization = await request<{
          status: keyof typeof LoginStatus;
          challenge: string;
        }>(`${this._configuration?.baseUrl}/login/authorize/${reqAuthorization.result.track_id}`, null);

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

    this.logger.debug("Requesting a challenge");
    const challenge = await request<{
      logged_in: boolean;
      challenge: string;
    }>(`${this._configuration.baseUrl}/login/`, null);
    const password = HmacSHA1(challenge.result.challenge, this._app.app_token).toString();

    this.logger.debug("Resolving challenge");
    const reqSession = await request<{
      session_token: string;
      challenge: string;
      // TODO: create a type for permissions
      permissions: Record<string, boolean>;
    }>(
      `${this._configuration.baseUrl}/login/session/`,
      null,
      {
        body: {
          app_id: this._app.app_id,
          password,
        },
      },
      "POST"
    );

    this.logger.debug(
      `Get sesion token with permssions: ${Object.keys(reqSession.result.permissions)
        .filter((key) => reqSession.result.permissions[key] === true)
        .join(", ")}`
    );
    this.logger.debug("Session resolved");
    this._app.session_token = reqSession.result.session_token;
    this.token = this._app.session_token;
    this.logger.info("Logged in with sesion_token: ", this._app.session_token);

    this.logger.info(this.token);
    this.wifi = new Wifi(this);
    this.LAN = new LAN(this);
    this.connection = new Connection(this);
    this.port = new Port(this);
    this.player = new Player(this);

    this.request = request;
  }

  /**
   * @todo
   */
  logout() {}
}

export { Freebox };
