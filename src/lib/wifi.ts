import request from "~freebox/utils/fetch";
import Submodule from "~freebox/lib/submodule";
import { Freebox } from "~freebox/index";
import { Response, VoidResponse } from "~freebox/@types";
import { AP, config, state } from "~freebox/@types/wifi";
import { WifiCustomKeyParams } from "~freebox/@types/wifi/guest";

class Wifi extends Submodule {
  public guest: Guest;

  constructor(freebox: Freebox) {
    super(freebox);
    this.guest = new Guest(freebox);
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

class Guest extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  async create(config: WifiCustomKeyParams): Promise<Response<WifiCustomKeyParams>> {
    return await request<WifiCustomKeyParams>(`${this.baseUrl}/wifi/custom_key/`, this.token, { body: config }, "POST");
  }

  async delete(id: number): Promise<Response<VoidResponse>> {
    return await request<VoidResponse>(`${this.baseUrl}/wifi/custom_key/${id}`, this.token, undefined, "DELETE");
  }

  async get_list(): Promise<Response<WifiCustomKeyParams[]>> {
    const res = await request<WifiCustomKeyParams[]>(`${this.baseUrl}/wifi/custom_key/`, this.token);

    if (!res.result) return { success: true, result: [] };

    return res;
  }

  async get(id: number): Promise<Response<WifiCustomKeyParams>> {
    return await request<WifiCustomKeyParams>(`${this.baseUrl}/wifi/custom_key/${id}`, this.token);
  }
}

export { Wifi };
