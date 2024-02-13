interface Port {
  enabled: boolean;
  comment: string;
  id: number;
  valid: boolean;
  host: {
    l2ident: L2Ident;
    active: boolean;
    persistent: boolean;
    names: Name[];
    vendor_name: string;
    host_type: string;
    interface: string;
    id: string;
    last_time_reachable: number;
    primary_name_manual: boolean;
    l3connectivities: L3Connectivity[];
    access_point: AccessPoint;
    default_name: string;
    first_activity: number;
    reachable: boolean;
    last_activity: number;
    primary_name: string;
  };
  src_ip: string;
  hostname: string;
  lan_port: number;
  wan_port_end: number;
  wan_port_start: number;
  lan_ip: string;
  ip_proto: string;
}

export interface AccessPoint {
  mac: string;
  type: string;
  tx_bytes: number;
  ethernet_information: EthernetInformation;
  uid: string;
  connectivity_type: string;
  rx_bytes: number;
}

export interface EthernetInformation {
  duplex: string;
  speed: number;
  max_port_speed: number;
  link: string;
}

export interface L2Ident {
  id: string;
  type: string;
}

export interface L3Connectivity {
  addr: string;
  active: boolean;
  reachable: boolean;
  last_activity: number;
  af: string;
  last_time_reachable: number;
}

export interface Name {
  name: string;
  source: string;
}

export default Port;
