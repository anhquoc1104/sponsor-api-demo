import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';

// Tags
@Schema({ versionKey: false })
export class AttributeHashtag extends AttributeCommonSchema {}

export type AttributeHashtagDocument = HydratedDocument<AttributeHashtag>;

export interface IAttributeHashtag extends Partial<AttributeHashtag> {
  _id?: any;
}

export const AttributeHashtagSchema =
  SchemaFactory.createForClass(AttributeHashtag);

AttributeHashtagSchema.index({ name: 'text' });
