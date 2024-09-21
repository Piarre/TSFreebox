interface Configuration {
  mac: string;
  model_info: ModelInfo;
  fans: Fan[];
  sensors: Fan[];
  board_name: string;
  disk_status: string;
  uptime: string;
  uptime_val: number;
  user_main_storage: string;
  box_authenticated: boolean;
  serial: string;
  firmware_version: string;
}

interface Fan {
  id: string;
  name: string;
  value: number;
}

interface ModelInfo {
  has_vm: boolean;
  net_operator: string;
  supported_languages: string[];
  has_wop: boolean;
  customer_hdd_slots: number;
  wifi_country: string;
  internal_hdd_size: number;
  wifi_type: string;
  pretty_name: string;
  has_lan_sfp: boolean;
  name: string;
  has_separate_internal_storage: boolean;
  has_lcd_orientation: boolean;
  default_language: string;
  has_eco_wifi: boolean;
  has_standby: boolean;
}

export { Configuration, Fan, ModelInfo };
