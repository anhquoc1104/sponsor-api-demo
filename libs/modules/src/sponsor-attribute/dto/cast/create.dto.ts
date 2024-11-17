import { IsMongoId, IsOptional } from 'class-validator';
import { CommonCreateAttributeDTO } from '../create-common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeCastDTO extends CommonCreateAttributeDTO {
  @IsOptional()
  @IsMongoId({ each: true })
  @ApiProperty({
    required: false,
    type: Array<String>,
    description: 'Danh sách thể loại người nổi tiếng',
  })
  cast_professions: string[];
}
