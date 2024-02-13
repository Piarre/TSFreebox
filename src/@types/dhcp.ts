interface DHCP {
  enabled: boolean;
  gateway: string;
  sticky_assign: boolean;
  ip_range_end: string;
  netmask: string;
  dns: string[];
  always_broadcast: boolean;
  ip_range_start: string;
}

export default DHCP;
