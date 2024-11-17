import { ApiProperty } from '@nestjs/swagger';
import { CommonUpdateAttributeEntity } from '../update-common.entity';
import { RangeDTO } from '../../dto';

export class UpdateAttributeBudgetRangeEntity extends CommonUpdateAttributeEntity {
  constructor(object: any) {
    super(object);
    this.min_range = object?.min_range;
    this.max_range = object?.max_range;
  }

  @ApiProperty({
    required: false,
    description: 'Mức sàn',
  })
  min_range: RangeDTO;

  @ApiProperty({
    required: false,
    description: 'Mức trần',
  })
  max_range: RangeDTO;
}
