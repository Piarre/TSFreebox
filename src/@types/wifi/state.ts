import band from "./band";

/**
 * Get the global wifi state
 */
interface state {
  /** enabled or disabled */
  state: "enabled" | "disabled" | "disabled_planning";
  /** list of all wifi cards */
  expected_phys: expectedPhys[];
}

interface expectedPhys {
  band: keyof typeof band;
  phy_id: number;
  detected: boolean;
}

export { state };
