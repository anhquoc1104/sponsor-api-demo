import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';
import mongoose from 'mongoose';
import { AttributeCastProfession } from './attribute-cast-profession.schema';

// Người nổi tiếng | KOL
@Schema({ versionKey: false })
export class AttributeCast extends AttributeCommonSchema {
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    refs: AttributeCastProfession.name,
  })
  cast_professions: mongoose.Schema.Types.ObjectId[]; // Phân loại người nổi tiếng
}

export type AttributeCastDocument = HydratedDocument<AttributeCast>;

export interface IAttributeCast extends Partial<AttributeCast> {
  _id?: any;
}

export const AttributeCastSchema = SchemaFactory.createForClass(AttributeCast);

AttributeCastSchema.index({ name: 'text' });
