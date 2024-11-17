import { IsMongoId, IsOptional } from 'class-validator';
import { CommonUpdateAttributeDTO } from '../update-common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttributeCastDTO extends CommonUpdateAttributeDTO {
  @IsOptional()
  @IsMongoId({ each: true })
  @ApiProperty({
    required: false,
    type: Array<String>,
    description: 'Danh sách thể loại người nổi tiếng',
  })
  cast_professions: string[];
}
