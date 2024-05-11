interface Player {
  device_name: string;
  stb_type: string;
  uid: string;
  reachable: boolean;
  api_version: string;
  id: number;
  api_available: boolean;
}

interface PlayerStatusForegroudApp {
  package_id: string;
  cur_url: string;
  context: {
    player: ContextPlayer;
    channel: Channel;
  };
  package: string;
}

interface PlayerStatusCapabilities {
  play: boolean;
  pause: boolean;
  stop: boolean;
  next: boolean;
  prev: boolean;
  record: boolean;
  record_stop: boolean;
  seek_forward: boolean;
  seek_backward: boolean;
  seek_to: boolean;
  shuffle: boolean;
  repeat_all: boolean;
  repeat_one: boolean;
  select_stream: boolean;
  select_audio_track: boolean;
  select_srt_track: boolean;
}

interface PlayerStatusInformation {
  name: string;
  last_activity: string | number | any;
  capabilities: Partial<PlayerStatusCapabilities> | { [key: string]: boolean };
}

interface PlayerStatus {
  power_state: power_state;
  player: PlayerStatusInformation;
  foreground_app: PlayerStatusForegroudApp;
  state: State;
}

interface Channel {
  services: Service[];
  isTimeShifting: boolean;
  videoIsVisible: boolean;
  channelName: string;
  channelNumber: number;
  channelType: string;
  bouquetName: string;
  currentServiceIndex: string;
  channelUuid: string;
  bouquetType: string;
  bouquetId: number;
  channelSubNumber: number;
}

interface Service {
  timeshifting: boolean;
  id: number;
  typeLabel: string;
  qualityName: string;
  url: string;
  name: string;
  qualityLabel: string;
  sortInfo: number;
  pvr: string;
  typeName: string;
  priv: {
    iptv: IPTV;
    type: string;
  };
}

interface IPTV {
  bandwidth: number;
  udpmsg3_namespace: number;
  udpmsg3_service: number;
  rash: boolean;
  lan_stream: boolean;
}

interface ContextPlayer {
  source: string;
  duration: number;
  livePos: string;
  playbackState: string;
  audioIndex: number;
  audioList: AudioList[];
  curPos: string;
  subtitleIndex: number;
  videoIndex: number;
  metadata: object & any;
  videoList: VideoList[];
  subtitleList: SubtitleList[];
  position: number;
  mediaState: string;
  sourceHidden: boolean;
  minPos: string;
  maxPos: string;
}

interface AudioList {
  samplerate: number;
  type: string;
  pid: number;
  channelCount: number;
  bitrate: string;
  codec: string;
  adAvailable: boolean;
  uid: number;
  codecId: string;
  language: string;
  metadataId: string;
}

interface SubtitleList {
  codec: string;
  pid: number;
  uid: number;
  language: string;
  type: string;
}

interface VideoList {
  bitrate: string;
  codec: string;
  pid: number;
  height: number;
  framerate: {
    den: number;
    num: number;
  };
  uid: number;
  width: number;
}

interface State {
  duration_ms: number;
  playback_state: string;
  position_ms: number;
}

type power_state = "standby" | "running";

enum commands {
  play_pause = "toogle play pause",
  stop = "stop",
  prev = "previous",
  next = "next",
  select_stream = "select quality of the stream",
  select_audio_track = "select audio track",
  select_srt_track = "select subtitle track",
}

interface volume {
  mute: boolean;
  volume: number;
}

export {
  Player,
  PlayerStatusForegroudApp,
  PlayerStatusCapabilities,
  PlayerStatusInformation,
  PlayerStatus,
  power_state,
  commands,
  volume,
};
