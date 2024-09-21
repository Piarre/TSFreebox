import request from "~freebox/utils/fetch";
import { Freebox } from "../freebox";
import Submodule from "../submodule";
import { Response, VoidResponse } from "~freebox/@types";
import { Configuration } from "~freebox/@types/app";

class System extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  async config(): Promise<Response<Configuration>> {
    return await request<Configuration>(`${this.baseUrl}/system/`, this.token);
  }

  async reboot(): Promise<VoidResponse> {
    return await request<VoidResponse>(`${this.baseUrl}/system/reboot/`, this.token, null, "POST");
  }

  /**
   * @requires API v11 - Freebox Ultra Only
   * @returns
   */
  async shutdown(): Promise<VoidResponse> {
    return await request<VoidResponse>(`${this.baseUrl}/system/shutdown/`, this.token, null, "POST");
  }
}
export { System };
