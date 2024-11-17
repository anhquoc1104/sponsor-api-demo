import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';

// Nền tảng
@Schema({ versionKey: false })
export class AttributePlatform extends AttributeCommonSchema {
  @Prop({
    type: String,
    trim: true,
  })
  image: string;
}

export type AttributePlatformDocument = HydratedDocument<AttributePlatform>;

export interface IAttributePlatform extends Partial<AttributePlatform> {
  _id?: any;
}

export const AttributePlatformSchema =
  SchemaFactory.createForClass(AttributePlatform);

AttributePlatformSchema.index({ name: 'text' });
