interface LanConfig {
  /** Freebox Server IPv4 address */
  ip: string;
  /** Freebox Server name */
  name: string;
  /** Freebox Server DNS name */
  name_dns: string;
  /** Freebox Server mDNS name */
  name_mdns: string;
  /** Freebox Server netbios name */
  name_netbios: string;
  /** The valid LAN modes are:
   * @see {LanMode}
   */
  mode: keyof typeof LanMode;
}

enum LanMode {
  router = "The Freebox acts as a network router",
  bridge = "The Freebox acts as a network bridge",
}

export { LanConfig };
