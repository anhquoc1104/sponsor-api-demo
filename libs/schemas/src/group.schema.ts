import { ACCOUNT_TYPE } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base';

@Schema({ versionKey: false })
export class Group extends BaseSchema {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  description: string;

  @Prop({
    type: String,
    enum: ACCOUNT_TYPE,
    index: true,
  })
  type: ACCOUNT_TYPE;
}

export type GroupDocument = HydratedDocument<Group>;

export interface IGroup extends Partial<Group> {
  _id?: any;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.index({ name: 'text', description: 'text' });
