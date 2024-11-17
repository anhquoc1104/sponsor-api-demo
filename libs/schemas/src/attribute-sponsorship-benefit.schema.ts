import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeCommonSchema } from './attribute-common.schema';

// Nhóm quyền lơi tài trơ
@Schema({ versionKey: false })
export class AttributeSponsorshipBenefit extends AttributeCommonSchema {
  @Prop({
    type: String,
    trim: true,
  })
  image: string;
}

export type AttributeSponsorshipBenefitDocument =
  HydratedDocument<AttributeSponsorshipBenefit>;

export interface IAttributeSponsorshipBenefit
  extends Partial<AttributeSponsorshipBenefit> {
  _id?: any;
}

export const AttributeSponsorshipBenefitSchema = SchemaFactory.createForClass(
  AttributeSponsorshipBenefit,
);

AttributeSponsorshipBenefitSchema.index({ name: 'text' });
