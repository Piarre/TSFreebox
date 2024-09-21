import { LanHost } from "~freebox/@types/lan";

interface WifiCustomKeyHost {
  hostname: string;
  host: LanHost;
}

interface WifiCustomKeyParams {
  description?: string;
  key: string;
  max_use_count: `${number}`;
  duration: number;
  access_type: keyof typeof AccessType;
}

interface WifiCustomKey {
  id: number;
  remain: number;
  params: WifiCustomKeyParams;
  users: WifiCustomKeyHost[];
}

enum AccessType {
  full = "stations will get full access to local network + internet",
  net_only = "stations connected using this custom key will be isolated and won’t have access to local network devices",
}

export { WifiCustomKey, WifiCustomKeyHost, WifiCustomKeyParams, AccessType };
