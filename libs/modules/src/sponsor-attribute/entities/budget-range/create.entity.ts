import { ApiProperty } from '@nestjs/swagger';
import { CommonCreateAttributeEntity } from '../create-common.entity';
import { RangeDTO } from '../../dto';

export class CreateAttributeBudgetRangeEntity extends CommonCreateAttributeEntity {
  constructor(object: any) {
    super(object);
    this.min_range = object?.min_range;
    this.max_range = object?.max_range;
  }

  @ApiProperty({
    required: true,
    description: 'Mức sàn',
  })
  min_range: RangeDTO;

  @ApiProperty({
    required: true,
    description: 'Mức trần',
  })
  max_range: RangeDTO;
}
