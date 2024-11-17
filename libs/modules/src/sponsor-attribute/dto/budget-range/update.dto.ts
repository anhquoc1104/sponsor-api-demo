import { IsOptional } from 'class-validator';
import { CommonUpdateAttributeDTO } from '../update-common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RangeDTO } from './create.dto';

export class UpdateAttributeBudgetRangeDTO extends CommonUpdateAttributeDTO {
  @IsOptional()
  @ApiProperty({
    required: true,
    type: Object,
  })
  min_range: RangeDTO;

  @IsOptional()
  @ApiProperty({
    required: true,
    type: Object,
  })
  max_range: RangeDTO;
}
