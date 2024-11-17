export * from './session.interface';
export interface ITrackingThirdTimesPassword {
  is_valid: boolean;
  message: string;
}

export interface IVerifyResponse {
  is_expired: boolean;
  value?: {
    id: string;
    timestamp: number;
  };
}
