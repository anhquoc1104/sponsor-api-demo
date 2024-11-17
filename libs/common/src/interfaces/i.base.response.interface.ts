export interface IBaseResponse {
  data: any;
  meta?: IBaseMeta;
  query: any;
}

export interface IBaseMeta {
  per_page?: number;
  current_page?: number;
  tota_iItems?: number;
  total_pages?: number;
}
