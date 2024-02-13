import get, { post, put } from "../utils/fetch";
import Submodule from "./base";
import { Freebox } from "./freebox";
import { LanHost, LanInterface } from "../@types/lan";
import { Response, VoidResponse } from "../@types/response";
import { LanConfig } from "../@types/lan/config";

/**
 * Lan browser API allow you to discover hosts on the local network
 * @link https://mafreebox.freebox.fr/doc/index.html#lan-browser-api
 * @class LAN
 * @extends Submodule
 */
class LAN extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  /**
   * Returns the current LanConfig
   * @link https://mafreebox.freebox.fr/doc/index.html#get-the-current-lan-configuration
   * @returns {Promise<Response<LanConfig>>}
   */
  async config(): Promise<Response<LanConfig>> {
    return await get<LanConfig>(`${this.baseUrl}/lan/config/`, this.token);
  }

  /**
   * Update the current LanConfig
   * @link https://mafreebox.freebox.fr/doc/index.html#update-the-current-lan-configuration
   * @param config The new partial LanConfig
   * @returns {Promise<Response<Partial<LanConfig>>>}
   */
  async updateConfig(config: Partial<LanConfig>): Promise<Response<Partial<LanConfig>>> {
    if (!config || Object.keys(config).length === 0) throw new Error("config is required");
    return await put<Partial<LanConfig>>(`${this.baseUrl}/lan/config/`, this.token, {
      body: config,
    });
  }

  /**
   * Getting the list of browsable LAN interfaces
   * @link https://mafreebox.freebox.fr/doc/index.html#getting-the-list-of-browsable-lan-interfaces
   * @returns {Promise<Response<LanInterface[]>>}
   */
  async interfaces(): Promise<Response<LanInterface[]>> {
    return await get<LanInterface[]>(`${this.baseUrl}/lan/browser/interfaces/`, this.token);
  }

  /**
   * Getting the list of hosts on a given interface
   * @link https://mafreebox.freebox.fr/doc/index.html#getting-the-list-of-hosts-on-a-given-interface
   * @param _interface Returns the list of LanHost on this interface
   * @returns {Promise<Response<LanHost[]>>}
   */
  async hosts(_interface: string = "pub"): Promise<Response<LanHost[]>> {
    if (!_interface) throw new Error("interface is required");
    return await get<LanHost[]>(`${this.baseUrl}/lan/browser/${_interface}/`, this.token);
  }

  /**
   * Getting an host information
   * @link https://mafreebox.freebox.fr/doc/index.html#getting-an-host-information
   * @param _interface - The interface to which the host is connected
   * @param id - The id of the host
   * @returns {Promise<Response<LanHost>>}
   */
  async host(_interface: string = "pub", id: string): Promise<Response<LanHost>> {
    if (!_interface) throw new Error("interface is required");
    if (!id) throw new Error("id is required");
    return await get<LanHost>(`${this.baseUrl}/lan/browser/${_interface}/${id}/`, this.token);
  }

  /**
   * Updating an host information
   * @link https://mafreebox.freebox.fr/doc/index.html#updating-an-host-information
   * @param _interface The interface to which the host is connected
   * @param id The id of the host
   * @param data The data to update
   * @returns {Promise<Response<Partial<LanHost>>>}
   */
  async updateHost(
    _interface: string = "pub",
    id: string,
    data: Partial<LanHost>
  ): Promise<Response<Partial<LanHost>>> {
    if (!_interface) throw new Error("interface is required");
    if (!id) throw new Error("id is required");
    if (!data || Object.keys(data).length === 0) throw new Error("data is required");
    return await put<Partial<LanHost>>(`${this.baseUrl}/lan/browser/${_interface}/${id}/`, this.token, {
      body: data,
    });
  }

  /**
   * Send a wake on LAN packet to the specified host with an optional password
   * @link https://mafreebox.freebox.fr/doc/index.html#send-wake-ok-lan-packet-to-an-host
   * @param _interface The interface to which the host is connected
   * @param mac The MAC address of the host
   * @param password - [OPTIONAL] The password to use to send the WOL packet
   * @returns
   */
  async WOL(_interface: string = "pub", mac: string, password: string = ""): Promise<VoidResponse> {
    if (!_interface) throw new Error("interface is required");
    if (!mac) throw new Error("mac is required");
    return await post<VoidResponse>(`${this.baseUrl}/lan/wol/${_interface}/`, this.token, {
      body: {
        mac,
        password,
      },
    });
  }
}

export { LAN };
