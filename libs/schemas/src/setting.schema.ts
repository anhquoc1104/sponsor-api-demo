import { ENUM_TYPE_VARIABLE } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base';

@Schema({ versionKey: false })
export class Setting extends BaseSchema {
  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  key: string;

  @Prop({
    type: String,
    trim: true,
    default: null,
  })
  description: string;

  @Prop({
    type: String,
    enum: ENUM_TYPE_VARIABLE,
    default: ENUM_TYPE_VARIABLE.OBJECT,
    trim: true,
  })
  type: ENUM_TYPE_VARIABLE;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  value: mongoose.Schema.Types.Mixed;
}

export type SettingDocument = HydratedDocument<Setting>;

export interface ISetting extends Partial<Setting> {
  _id?: any;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

SettingSchema.index({ name: 'text', description: 'text' });
