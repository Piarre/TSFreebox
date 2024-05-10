export interface Response<T> {
  success: boolean;
  result: T;
}

export interface VoidResponse {
  success: boolean;
}

/** List of available names, and their source */
export interface Layer2Id {
  /** Layer 2 id */
  id: string;
  /** Type of layer 2 address */
  type: keyof typeof Layer2Type;
}

export enum Layer2Type {
  dhcp = "DHCP",
  netbios = "Netbios",
  mdns = "mDNS hostname",
  mdns_srv = "mDNS service",
  upnp = "UPnP",
  wsd = "WS-Discovery",
}

export interface Layer3Connectivity {
  /** Layer 3 address */
  addr: string;
  /** Layer 3 address type
   * @see {Layer3AF}
   */
  af: keyof typeof Layer3AF;
  /** is the connection active */
  active: boolean;
  /** is the connection reachable */
  reachable: boolean;
  /** last activity timestamp */
  last_activity: number;
  /** last reachable timestamp */
  last_time_reachable: number;
  /** device model if known */
  model: string;
}

export enum Layer3AF {
  ipv4 = "IPv4",
  ipv6 = "IPv6",
}

export enum IPProto {
  tcp = "TCP",
  udp = "UDP",
}
