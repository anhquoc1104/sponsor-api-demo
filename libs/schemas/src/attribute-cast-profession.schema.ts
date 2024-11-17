import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';

// Thể loại người nổi tiếng
@Schema({ versionKey: false })
export class AttributeCastProfession extends AttributeCommonSchema {
  @Prop({
    type: String,
    trim: true,
  })
  image: string;
}

export type AttributeCastProfessionDocument =
  HydratedDocument<AttributeCastProfession>;

export interface IAttributeCastProfession
  extends Partial<AttributeCastProfession> {
  _id?: any;
}

export const AttributeCastProfessionSchema = SchemaFactory.createForClass(
  AttributeCastProfession,
);

AttributeCastProfessionSchema.index({ name: 'text' });
