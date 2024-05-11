import request from "../utils/fetch";
import Submodule from "./submodule";
import { Freebox } from "./freebox";
import { Player as TPlayer, power_state, commands, volume, PlayerStatus } from "../@types/player";
import { Response, VoidResponse } from "../@types";

class Player extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  /**
   * Returns the list of all player devices registered on the local network
   * @link https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#list-every-player-devices
   * @returns {Promise<Response<TPlayer[]>>}
   */
  async list(): Promise<Response<TPlayer[]>> {
    return await request<TPlayer[]>(`${this.baseUrl}/player/`, this.token);
  }

  /**
   * Get player device status
   * @link https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#get-player-device-status
   * @param id The ID of the player device to get the status for
   * @returns {Promise<Response<Partial<PlayerStatus>>>}
   */
  async status(id: number): Promise<Response<Partial<PlayerStatus>>> {
    return await request<Partial<PlayerStatus>>(`${this.baseUrl}/player/${id}/api/v6/status/`, this.token);
  }

  /**
   * Control the active media player of a device
   * @link https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#control-the-active-media-player-of-a-device
   * @param id The ID of the player device to control
   * @param cmd The command to send to the player device
   * @returns {Promise<VoidResponse>}
   */
  async command(id: number, cmd: keyof typeof commands): Promise<VoidResponse> {
    return await request<VoidResponse>(
      `${this.baseUrl}/player/${id}/api/v6/control/mediactrl/`,
      this.token,
      {
        body: {
          cmd,
        },
      },
      "POST"
    );
  }

  /**
   * Control the playback volume of the device
   * @link https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#control-the-playback-volume-of-the-device
   * @param id The ID of the player device to control
   * @param volume The volume to set on the player device or to mute the player device
   * @returns {Promise<Response<Partial<volume>>>}
   */
  async volume(id: number, volume?: Partial<volume>): Promise<Response<Partial<volume>>> {
    return await request<Partial<volume>>(
      `${this.baseUrl}/player/${id}/api/v6/control/volume/`,
      this.token,
      volume && {
        body: volume,
      },
      volume ? "PUT" : "GET"
    );
  }

  /**
   * Open a url on a player device
   * @link https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#open-a-url-on-a-player-device
   * @param id The ID of the player device to control
   * @param url Url to open on the Freebox Player
   * @param type Mime type of the content to open on the Freebox Player (optional: default is empty)
   * @returns {Promise<VoidResponse>}
   */
  async open(id: number, url: string, type?: string): Promise<VoidResponse> {
    return await request<VoidResponse>(
      `${this.baseUrl}/player/${id}/api/v6/control/open/`,
      this.token,
      {
        body: {
          url,
          type,
        },
      },
      "POST"
    );
  }
}

export { Player };
