/**
 * Global config gives quick access to major configuration settings (eg: toggle Wi-Fi)
 */
interface config {
  /** is wifi enabled */
  enabled: boolean;
  power_saving: boolean;
  mac_filter_state: "disabled" | "whitelist" | "blacklist";
}

export { config };
