import { BaseCreateDTO } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  MAX_LENGTH_DESCRIPTION_ATTRIBUTE,
  MAX_LENGTH_NAME_ATTRIBUTE,
} from '../constants';

export class CommonCreateAttributeDTO extends BaseCreateDTO {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_NAME_ATTRIBUTE)
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of attribute sponsor',
    example: 'vtv',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_DESCRIPTION_ATTRIBUTE)
  @ApiProperty({
    required: false,
    type: String,
    description: 'description of attribute sponsor',
    example: 'vtv hashtag',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'image of attribute sponsor',
    example: '/public/image/followme.jpg',
  })
  image: string;
}
