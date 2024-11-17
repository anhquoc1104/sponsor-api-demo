import { ApiProperty } from '@nestjs/swagger';
import { CommonCreateAttributeEntity } from '../create-common.entity';

export class CreateAttributeCastEntity extends CommonCreateAttributeEntity {
  constructor(object: any) {
    super(object);
    this.cast_professions = object.cast_professions;
  }

  @ApiProperty({
    required: false,
    description: 'Phân loại người nổi tiếng',
    example: '66dd09d8965b73312df0613b',
  })
  cast_professions: string[];
}
