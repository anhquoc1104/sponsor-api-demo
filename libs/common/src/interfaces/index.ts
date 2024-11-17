export * from './i.base.service';
export * from './i.base.interface';
export * from './i.base.response.interface';
export * from './i.base.find.interface';
export * from './socket.interface';
export * from './tcp.service';

export interface IBaseGetAllResult {
  data: Array<any>;
  meta?: {
    perPage?: Number;
    currentPage?: Number;
    totalItems?: Number;
    totalPages?: Number;
  };
  query?: any;
}

export interface IBaseBetweenPastAndCurrent {
  newArray?: Array<string>;
  oldArray?: Array<string>;
  sameArray?: Array<string>;
}

export interface IVietnameseAnalysis {
  $caseSensitive: boolean;
  $search: string;
  $diacriticSensitive: boolean;
}

export interface IPermissionFrame {
  property: string;
  description: string;
  values: Array<{
    key: string;
    description: string;
    value: string;
  }>;
}
