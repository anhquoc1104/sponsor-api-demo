import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CommonCreateAttributeDTO } from '../create-common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_CURRENCY_UNIT } from '@app/common';

export class RangeDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: true,
    type: Number,
    description: 'value budget',
    example: 1000000,
  })
  value: number;

  @IsOptional()
  @IsEnum(ENUM_CURRENCY_UNIT)
  @ApiProperty({
    required: true,
    type: String,
    description: 'unit of value',
    example: ENUM_CURRENCY_UNIT.VND,
  })
  unit: string;
}

export class CreateAttributeBudgetRangeDTO extends CommonCreateAttributeDTO {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Object,
  })
  min_range: RangeDTO;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Object,
  })
  max_range: RangeDTO;
}
