import { ConnectionConfig, ConnectionStatus, IPv6ConnectionConfiguration } from "../@types/connection";
import { Response } from "../@types/response";
import get, { put } from "../utils/fetch";
import Submodule from "./base";
import { Freebox } from "./freebox";

class Connection extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  /**
   * Get the current Connection status
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#connection-status-object
   * @returns {Promise<Response<ConnectionStatus>>}
   */
  async status(): Promise<Response<ConnectionStatus>> {
    return await get<ConnectionStatus>(`${this.baseUrl}/connection/`, this.token);
  }

  /**
   * Get the current Connection configuration
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#get-the-current-connection-configuration
   * @returns {Promise<Response<ConnectionConfig>>}
   */
  async config(): Promise<Response<ConnectionConfig>> {
    return await get<ConnectionConfig>(`${this.baseUrl}/connection/config/`, this.token);
  }

  /**
   * Update the Connection configuration
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#update-the-connection-configuration
   * @param config The new configuration
   * @returns {Promise<Response<ConnectionConfig>>}
   */
  async updateConfig(config: Partial<ConnectionConfig>): Promise<Response<ConnectionConfig>> {
    return await put<ConnectionConfig>(`${this.baseUrl}/connection/config/`, this.token, {
      body: config,
    });
  }

  /**
   * Get the current IPv6 Connection configuration
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#get-the-current-ipv6-connection-configuration
   * @returns {Promise<Response<IPv6ConnectionConfiguration>>}
   */
  async IPv6config(): Promise<Response<IPv6ConnectionConfiguration>> {
    return await get<IPv6ConnectionConfiguration>(`${this.baseUrl}/connection/ipv6/config/`, this.token);
  }

  /**
   * Update the IPv6 Connection configuration
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#update-the-ipv6-connection-configuration
   * @param config The new configuration
   * @returns {Promise<Response<IPv6ConnectionConfiguration>>}
   */
  async updateIPv6Config(config: Partial<IPv6ConnectionConfiguration>): Promise<Response<IPv6ConnectionConfiguration>> {
    return await put<IPv6ConnectionConfiguration>(`${this.baseUrl}/connection/ipv6/config/`, this.token, {
      body: config,
    });
  }
}

export { Connection };
