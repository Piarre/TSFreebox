import { Freebox } from "~freebox/lib/freebox";
import Submodule from "~freebox/lib/submodule";
import { System } from "./system";

class Configuration extends Submodule {
  public system: System;

  constructor(freebox: Freebox) {
    super(freebox);

    this.system = new System(freebox);
  }
}

export { Configuration };
