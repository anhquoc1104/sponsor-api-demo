export interface IBaseInterface extends Record<string, any> {
  status?: string;
  created_at?: Date;
  created_by_user?: string;

  updated_at?: Date;
  updated_by_user?: string;
}
