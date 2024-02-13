import { ConnectionConfig, ConnectionStatus } from "../@types/connection";
import { Response } from "../@types/response";
import get, { put } from "../utils/fetch";
import Submodule from "./base";
import { Freebox } from "./freebox";

class Connection extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  /**
   * 
   * @returns {Promise<Response<ConnectionStatus>>}
   */
  async status(): Promise<Response<ConnectionStatus>> {
    return await get<ConnectionStatus>(`${this.baseUrl}/connection/`, this.token);
  }

  async config(): Promise<Response<ConnectionConfig>> {
    return await get<ConnectionConfig>(`${this.baseUrl}/connection/config/`, this.token);
  }

  async updateConfig(config: Partial<ConnectionConfig>): Promise<Response<ConnectionConfig>> {
    return await put<ConnectionConfig>(`${this.baseUrl}/connection/config/`, this.token, {
      body: config,
    });
  }

  async IPv6config() {
    return await get(`${this.baseUrl}/connection/ipv6/config/`, this.token);
  }
}

export { Connection };
