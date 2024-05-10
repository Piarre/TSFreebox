interface ConnectionStatus {
  state: keyof typeof State;
  type: keyof typeof Type;
  media: keyof typeof Media;
  /** Freebox IPv4 address
   * NOTE: this field is only available when connection state is up
   */
  ipv4: string;
  /** Freebox IPv6 address
   * NOTE: this field is only available when connection state is up
   */
  ipv6: string;
  /** current upload rate in byte/s */
  rate_up: number;
  /** current download rate in byte/s */
  rate_down: number;
  /** available upload bandwidth in bit/s */
  bandwith_up: number;
  /** available download bandwidth in bit/s */
  bandwith_down: number;
  /** total uploaded bytes since last connection */
  bytes_up: number;
  /** total downloaded bytes since last connection */
  bytes_down: number;
  /** Some customers share the same IPv4 and each customer is then assigned a port range.
   * The first value is the first port of the assigned range and the second value is the last port (inclusive).
   * All PortForwardingConfig must use ports in this range to be effective.
   */
  ipv4_port_range: [number, number];
}

enum State {
  going_up = "connection is initializing",
  up = "connection is active",
  going_down = "connection is about to become inactive",
  down = "connection is inactive",
}

enum Type {
  ethernet = "FTTH/ethernet",
  rfc2684 = "xDSL (unbundled)",
  pppoatm = "xDSL",
}

enum Media {
  ftth = "FTTH",
  ethernet = "ethernet",
  xdsl = "xDSL",
  backup_4g = "Internet Backup",
}

export { ConnectionStatus };
