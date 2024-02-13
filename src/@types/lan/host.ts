/**
 * Lan Host has the following attributes
 */
interface LanHost {
  /** Host id (unique on this interface) */
  id: string;
  /** Host primary name (chosen from the list of available names, or manually set by user) */
  primary_name: string;
  /** When possible, the Freebox will try to guess the host_type, but you can manually override this to the correct value
   * @see {HostType}
   */
  host_type: keyof typeof HostType;
  /** If true the primary name has been set manually */
  primary_name_manual: boolean;
  /** Layer 2 network id and its type */
  l2ident: Layer2Id;
  /** Host vendor name (from the mac address) */
  vendor_name: string;
  /** If true the host is always shown even if it has not been active since the Freebox startup */
  persistent: boolean;
  /** If true the host can receive traffic from the Freebox */
  reachable: boolean;
  /** Last time the host was reached */
  last_time_reachable: number;
  /** If true the host sends traffic to the Freebox */
  active: boolean;
  /** Last time the host sent traffic */
  last_activity: number;
  /** First time the host sent traffic, or 0 (Unix Epoch) if it wasn’t seen before this field was added */
  first_activity: number;
  /** List of available names, and their source */
  names: Hostname[];
  /** List of available layer 3 network connections */
  l3connectivities: Layer3Connectivity[];
  /** If device is associated with a profile, contains profile summary */
  network_control: Networkcontrol;
}

/**
 * When possible, the Freebox will try to guess the host_type, but you can manually override this to the correct value
 * Possible values are:
 */
enum HostType {
  Workstation = "workstation",
  Laptop = "laptop",
  Smartphone = "smartphone",
  Tablet = "tablet",
  Printer = "printer",
  VG_Console = "vg_console",
  Television = "television",
  Nas = "nas",
  IP_Camera = "ip_camera",
  IP_Phone = "ip_phone",
  Freebox_Player = "freebox_player",
  Freebox_HD = "freebox_hd",
  Freebox_Crystal = "freebox_crystal",
  Freebox_Mini = "freebox_mini",
  Freebox_Delta = "freebox_delta",
  Freebox_One = "freebox_one",
  Freebox_Wifi = "freebox_wifi",
  Freebox_Pop = "freebox_pop",
  Networking_Device = "networking_device",
  Multimedia_Device = "multimedia_device",
  Car = "car",
  Other = "other",
}

/** List of available names, and their source */
interface Layer2Id {
  /** Layer 2 id */
  id: string;
  /** Type of layer 2 address */
  type: keyof typeof Layer2Type;
}

enum Layer2Type {
  dhcp = "DHCP",
  netbios = "Netbios",
  mdns = "mDNS hostname",
  mdns_srv = "mDNS service",
  upnp = "UPnP",
  wsd = "WS-Discovery",
}

interface Hostname {
  /** Host name */
  name: string;
  /** source of the name */
  source: string;
}

interface Layer3Connectivity {
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

enum Layer3AF {
  ipv4 = "IPv4",
  ipv6 = "IPv6",
}

interface Networkcontrol {
  /** Id of profile this device is associated with. */
  profile_id: number;
  /** Name of profile this device is associated with. */
  name: string;
  /** Mode described in Network Control Object
   * @see {NetworkControlMode}
   */
  current_mode: keyof typeof NetworkControlMode;
}

/** The different modes supported are : */
enum NetworkControlMode {
  allowed = "access is allowed",
  denied = "access is denied",
  webonly = "access is granted only for HTTP and HTTPS traffic; legacy mode, use not recommended",
}

export { LanHost };
