export interface TCPMessagePartern {
  cmd: string;
}

export interface TCPMessagePayload<T = any> {
  user?: any;
  data: T;
}
