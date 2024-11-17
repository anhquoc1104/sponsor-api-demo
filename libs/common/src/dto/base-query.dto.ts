import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from '@app/shared/transforms/boolean.transform';
import { HttpStatus } from '@nestjs/common';

export class BaseQueryFilterDTO {
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: 1,
    required: false,
    description: 'Cho phép phân trang (default = 1)',
  })
  is_paging: boolean;

  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
    description: 'Số dòng mỗi trang',
  })
  per_page: number;

  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
    description: 'Trang hiện tại',
  })
  page: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'ACTIVE',
    description: 'Trạng thái',
    enum: ['ACTIVE'],
  })
  status: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Tìm kiếm theo từ khóa',
    example: 'string',
  })
  keyword: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'code,name',
    required: false,
    description: 'Trường hợp select box, chỉ trả về những field select',
  })
  select_fields: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    example: '5f9b8d8dd0afd399bbf328a1',
    description: '_id',
  })
  _id: any;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    example: 'name, code',
    description: 'Tên cần sắp xếp: name, code',
  })
  sort_name: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    example: 'ascend, descend',
    description: 'Loại sắp xếp ascend, descend',
  })
  sort_type: string;
}
export type Constructor<I> = new (...args: any[]) => I;

export function SwaggerResponseDTO(
  statusCode: number,
  message: string,
): Constructor<any> {
  class Error implements Error {
    @ApiProperty({
      description: 'Mã code HTTP',
      example: statusCode,
      required: true,
    })
    readonly statusCode: number;

    @ApiProperty({
      example: message,
      description: 'Mô tả API',
      required: true,
    })
    readonly message: string;
  }
  return Error;
}

export class BaseForbiddenResponseDTO extends SwaggerResponseDTO(
  HttpStatus.FORBIDDEN,
  'Truy cập bị từ chối!.',
) {}
export class BaseUnauthorizedResponseDTO extends SwaggerResponseDTO(
  HttpStatus.UNAUTHORIZED,
  'Xác thực không hợp lệ!.',
) {}
export class BaseServerErrorResponseDTO extends SwaggerResponseDTO(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'Đã xảy ra lỗi của hệ thống. Vui lòng liên hệ admin!.',
) {}
export class BaseOkResponseDTO extends SwaggerResponseDTO(HttpStatus.OK, '') {}
