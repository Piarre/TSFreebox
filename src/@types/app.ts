interface App {
  app_id: string;
  app_name: string;
  app_version: string | number;
  device_name: string;

  app_token?: string;
  track_id?: string;

  status?: string;
  logged_in?: LoginStatus | boolean;

  challenge?: string | null;
  password?: string | null;
  session_token?: string | null;

  permissions?: {} /* TODO */;

  debug?: boolean;
}

enum LoginStatus {
  unknown = "the app_token is invalid or has been revoked",
  pending = "the user has not confirmed the authorization request yet",
  timeout = "the user did not confirmed the authorization within the given time",
  granted = "the app_token is valid and can be used to open a session",
  denied = "the user denied the authorization request",
}

type Configuration = {
  baseUrl?: string;
};

export { type App, LoginStatus, Configuration };
