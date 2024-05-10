import { Freebox } from "./freebox";

class Submodule {
  private _freebox: Freebox;
  baseUrl: string;
  token: string;

  constructor(freebox: Freebox) {
    this._freebox = freebox;
    this.baseUrl = this._freebox._configuration.baseUrl;
    this.token = this._freebox.token;
  }
}

export default Submodule;
