import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';
import { ENUM_CURRENCY_UNIT } from '@app/common';

// Gói tài trợ
@Schema({ versionKey: false, _id: false })
class RangeSchema {
  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  value: number;

  @Prop({
    type: String,
    required: true,
    enum: ENUM_CURRENCY_UNIT,
    default: ENUM_CURRENCY_UNIT.VND,
    trim: true,
  })
  unit: string;
}

@Schema({ versionKey: false })
export class AttributeBudgetRange extends AttributeCommonSchema {
  @Prop({
    type: RangeSchema,
    required: true,
  })
  min_range: RangeSchema;

  @Prop({
    type: RangeSchema,
    required: true,
  })
  max_range: RangeSchema;
}

export type AttributeBudgetRangeDocument =
  HydratedDocument<AttributeBudgetRange>;

export interface IAttributeBudgetRange extends Partial<AttributeBudgetRange> {
  _id?: any;
}

export const AttributeBudgetRangeSchema =
  SchemaFactory.createForClass(AttributeBudgetRange);

AttributeBudgetRangeSchema.index({ name: 'text' });
