import { LanHost } from "./lan";

interface Port {
  /** forwarding id */
  id: number;
  /** is forwarding enabled */
  enabled: boolean;
  ip_proto: keyof typeof IPProto;
  /** forwarding range start */
  wan_port_end: number;
  /** forwarding range end */
  wan_port_start: number;
  /** forwarding target on LAN */
  lan_ip: string;
  /** forwarding target start port on LAN, (last port is lan_port + wan_port_end - wan_port_start) */
  lan_port: number;
  /** forwarding target host name */
  readonly hostname: string;
  /** forwarding target host name
   * @see {LanHost}
   */
  readonly host: LanHost;
  /** if src_ip == 0.0.0.0 this rule will apply to any src ip otherwise it will only apply to the specified ip address */
  src_ip: string;
  /** comment */
  comment: string;
}

export default Port;
