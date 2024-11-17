import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';

// Thể loại
@Schema({ versionKey: false })
export class AttributeCategory extends AttributeCommonSchema {
  @Prop({
    type: String,
    trim: true,
  })
  image: string;
}

export type AttributeCategoryDocument = HydratedDocument<AttributeCategory>;

export interface IAttributeCategory extends Partial<AttributeCategory> {
  _id?: any;
}

export const AttributeCategorySchema =
  SchemaFactory.createForClass(AttributeCategory);

AttributeCategorySchema.index({ name: 'text' });
