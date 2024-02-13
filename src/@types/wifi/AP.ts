import band from "./band";

interface AP {
  /** wifi ap id */
  id: number;
  /** wifi ap name */
  name: string;
  /** wifi ap status */
  status: keyof typeof ApStatus;
  /** ap capabilities */
  capabilities: Record<band, HT>;
  /** ap configuration */
  config: config;
}

enum ApStatus {
  scanning = "Ap is probing wifi channels",
  no_param = "Ap is not configured",
  bad_param = "Ap has an invalid configuration",
  disabled = "Ap is permanently disabled",
  disabled_planning = "Ap is currently disabled according to planning",
  no_active_bss = "Ap has no active BSS",
  starting = "Ap is starting",
  acs = "Ap is selecting the best available channel",
  ht_scan = "Ap is scanning for other access points",
  dfs = "Ap is performing dynamic frequency selection",
  active = "Ap is active",
  failed = "Ap has failed to start",
}

interface config {
  channel_width: 20 | 40 | 80 | 160;
  band: keyof typeof band;
  secondary_channel: number;
  ht: HT;
  dfs_enabled: boolean;
  eht: EHT;
  he: HE;
  primary_channel: number;
}

interface HT {
  greenfield: boolean;
  shortgi20: boolean;
  vht_rx_ldpc: boolean;
  ldpc: boolean;
  vht_rx_stbc: string;
  vht_shortgi80: boolean;
  vht_mu_beamformer: boolean;
  vht_sounding_dimensions: string;
  ht_enabled: boolean;
  rx_stbc: string;
  dsss_cck_40: boolean;
  tx_stbc: boolean;
  ac_enabled: boolean;
  smps: string;
  vht_shortgi160: boolean;
  vht_beamformee_sts: string;
  vht_tx_stbc: boolean;
  vht_su_beamformee: boolean;
  vht_su_beamformer: boolean;
  delayed_ba: boolean;
  vht_tx_antenna_consistency: boolean;
  max_amsdu_7935: boolean;
  vht_max_ampdu_len_exp: number;
  vht_max_mpdu_len: string;
  psmp: boolean;
  shortgi40: boolean;
  vht_rx_antenna_consistency: boolean;
  lsig_txop_prot: boolean;
}

interface EHT {
  enabled: boolean;
  su_beamformer: boolean;
  su_beamformee: boolean;
  mu_beamformer: boolean;
}

interface HE {
  enabled: boolean;
  su_beamformee: boolean;
  twt_responder: boolean;
  su_beamformer: boolean;
  twt_required: boolean;
  mu_beamformer: boolean;
}

export { AP };
