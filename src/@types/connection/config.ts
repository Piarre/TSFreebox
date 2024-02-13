interface ConnectionConfig {
  /** should the Freebox respond to external ping requests */
  ping: boolean;
  /** is the admin password secure enough to enable remote access */
  is_secure_pass: boolean;
  /** enable/disable HTTP remote access */
  remote_access: boolean;
  /** port number to use for remote HTTP access */
  remote_access_port: number;
  /** This field indicate the minimum possible value for remote_access_port (see ConnectionStatus ipv4_port_range) */
  remote_access_min_port: number;
  /** This field indicate the maximum possible value for remote_access_port (see ConnectionStatus ipv4_port_range) */
  remote_access_max_port: number;
  /** IPv4 to use for remote access (can be missing if connection is down) */
  remote_access_ip: string;
  /** is remote access enabled for apps, or share link */
  api_remote_access: boolean;
  /** enable/disable Wake-on-lan proxy */
  wol: boolean;
  /** is ads blocking feature enabled */
  adblock: boolean;
  /** if set to true adblock setting has never been set by the user */
  adblock_not_set: boolean;
  /** if false, user has disabled new token request. New apps can’t request a new token. Apps that already have a token are still allowed */
  allow_token_request: boolean;
  sip_alg: keyof typeof SipAlg;
}

interface IPv6ConnectionConfiguration {
  /** is IPv6 enabled */
  ipv6_enabled: boolean;
  /** is IPv6 firewall enabled */
  ipv6_firewall: boolean;
  /** Freebox IPv6 link local address */
  ipv6ll: string;
  /** list of IPv6 delegations */
  delegations: Delegation[];
}

interface Delegation {
  /** IPv6 prefix */
  prefix: string;
  /** the next hop for the prefix */
  next_hop: string;
}

enum SipAlg {
  disabled = "Fully disable SIP ALG",
  direct_media = "Enable SIP ALG, RTP only allowed between SIP UA",
  any_media = "Enable SIP ALG, RTP allowed between any host (dangerous for untrusted hosts)",
}

export { ConnectionConfig, IPv6ConnectionConfiguration };
