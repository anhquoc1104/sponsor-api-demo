import { ApiProperty } from '@nestjs/swagger';
import { CommonUpdateAttributeEntity } from '../update-common.entity';

export class UpdateAttributeCastEntity extends CommonUpdateAttributeEntity {
  constructor(object: any) {
    super(object);
    this.cast_professions = object.cast_professions;
  }

  @ApiProperty({
    required: false,
    description: 'Phân loại người nổi tiếng',
  })
  cast_professions: string[];
}
