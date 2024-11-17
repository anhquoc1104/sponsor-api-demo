import { ObjectId } from 'mongoose';

export type BaseSchemaType = {
  status?: string;
  created_at?: Date;
  created_by_user?: ObjectId;
  updated_at?: Date;
  updated_by_user?: ObjectId;
  deleted_at?: Date;
};
