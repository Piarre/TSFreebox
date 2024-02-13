export interface Response<T> {
  success: boolean;
  result: T;
}

export interface VoidResponse {
  success: boolean;
}