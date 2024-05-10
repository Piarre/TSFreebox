import { AP, config, state } from "../@types/wifi";
import request from "../utils/fetch";
import Submodule from "./submodule";
import { Freebox } from "./freebox";
import { Response } from "../@types";

class Wifi extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  async config() {
    return await request<config>(`${this.baseUrl}/wifi/config/`, this.token);
  }

  async state() {
    return await request<state>(`${this.baseUrl}/wifi/state/`, this.token);
  }

  async AP<T = AP[]>(id?: number): Promise<Response<T>> {
    return await request<T>(id == undefined ? `${this.baseUrl}/wifi/ap/` : `${this.baseUrl}/wifi/ap/${id}`, this.token);
  }

  async BSS() {
    return await request(`${this.baseUrl}/wifi/bss/`, this.token);
  }
}

export { Wifi };
