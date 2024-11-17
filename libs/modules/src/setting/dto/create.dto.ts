import { BaseCreateDTO } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSettingDTO extends BaseCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'config mail',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'name of setting',
    example: 'MAIL_CONFIG',
  })
  key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'type of setting',
    example: 'OBJECT',
  })
  type: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'description of setting',
    example: 'description',
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Value of setting',
    example: 'description',
  })
  value: string;
}
