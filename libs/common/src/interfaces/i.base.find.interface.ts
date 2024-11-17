import { PipelineStage } from 'mongoose';

interface IFindInOperator<T> {
  $in: T[];
}
export enum ENUM_BASE_FIND_CONVERT_TYPE {
  OBJECTID = 'OBJECTID',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

export interface IBaseFindConditonNoKeywordOptionResponse {
  year?: number;
  status?: string | IFindInOperator<string>;
  statuses?: IFindInOperator<string>;
  display_status?: string | IFindInOperator<string>;
  sponsorship_status?: string | IFindInOperator<string>;
  production_status?: string | IFindInOperator<string>;

  sponsor_category?: string | IFindInOperator<string>;
  sponsor_categories?: IFindInOperator<string>;

  sponsor_hashtag?: string | IFindInOperator<string>;
  sponsor_hashtags?: IFindInOperator<string>;

  cast?: string | IFindInOperator<string>;
  casts?: IFindInOperator<string>;

  platform?: string | IFindInOperator<string>;
  platforms?: IFindInOperator<string>;

  sponsorship_form?: string | IFindInOperator<string>;
  sponsorship_forms?: IFindInOperator<string>;

  exclude?: string | IFindInOperator<string>;
  excludes?: IFindInOperator<string>;
}

export interface IBaseSearchFields {
  continue?: boolean;
  filter?: any;
  keyMap: string;
  search: string;
}

export interface ISelectAfterQuery {
  select_by_populate: string | object;
  select_by_project_aggregate: PipelineStage.Project[];
}
