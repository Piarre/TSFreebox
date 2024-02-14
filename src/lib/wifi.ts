import { AP, config, state } from "../@types/wifi";
import { get } from "../utils/fetch";
import Submodule from "./submodule";
import { Freebox } from "./freebox";
import { Response } from "../@types";

class Wifi extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  async config() {
    return await get<config>(`${this.baseUrl}/wifi/config/`, this.token);
  }

  async state() {
    return await get<state>(`${this.baseUrl}/wifi/state/`, this.token);
  }

  async AP<T = AP[]>(id?: number): Promise<Response<T>> {
    return await get<T>(id == undefined ? `${this.baseUrl}/wifi/ap/` : `${this.baseUrl}/wifi/ap/${id}`, this.token);
  }

  async BSS() {
    return await get(`${this.baseUrl}/wifi/bss/`, this.token);
  }
}

export { Wifi };
