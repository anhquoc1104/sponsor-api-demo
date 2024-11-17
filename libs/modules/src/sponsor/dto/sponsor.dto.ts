import {
  IsString,
  IsEnum,
  ValidateNested,
  IsArray,
  IsOptional,
  IsDate,
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsBoolean,
  ArrayMaxSize,
  ValidateIf,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DisplayStatus, ProductionStatus } from '@app/modules/sponsor/enums';
import { BaseCreateDTO, Common } from '@app/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from '@app/shared';
class scheduleDetailsDto {
  @IsOptional()
  @IsString()
  time: string;

  @IsString()
  @IsOptional()
  @IsString()
  description?: string;
}
class RejectReasonDTO {
  @IsOptional()
  @IsString()
  reason: string;

  @IsOptional()
  @IsMongoId()
  @IsString()
  refuser?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at?: Date;
}
class SponsorPlatformDTO {
  @IsNotEmpty()
  @IsMongoId()
  platform: string;

  @IsOptional()
  @IsString()
  link?: string;
}
class SponsorShipformDTO {
  @IsMongoId()
  @IsNotEmpty()
  sponsorship_form: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  media?: string;
}
class SponsorSchedulerDTO {
  @IsOptional()
  @IsString()
  event_time: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => scheduleDetailsDto)
  schedule_details?: scheduleDetailsDto[];
}
class SponsorshipPackageDto {
  @IsNotEmpty()
  @IsString()
  package_name: string;

  @IsNotEmpty()
  @IsNumber()
  package_value: number;

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  package_unit: string;

  @IsNotEmpty()
  @IsBoolean()
  @ToBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  file: string;
}
export class CreateSponsorDTO extends BaseCreateDTO {
  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Tên Chương Trình',
    default: null,
  })
  sponsor_name: string;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Cover Image',
    default: null,
  })
  cover_image: string;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Banner Image',
    default: null,
  })
  banner_image: string;

  @IsBoolean()
  @ToBoolean()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Banner Image',
    default: false,
  })
  product_limited_is_limit: boolean;

  @ValidateIf((value) =>
    Common.compareValues(value?.product_limited_is_limit, true),
  )
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Banner Image',
    default: null,
  })
  product_limited_description: string;

  @ValidateIf(
    (property) =>
      !Common.compareValues(property?.display_status, DisplayStatus.DRAFT),
  )
  @IsNotEmpty()
  @Transform((property) =>
    property.value ? Common.transformDate(property.value) : null,
  )
  @ApiProperty({
    required: true,
    type: Date,
    description: 'Thời Gian Diễn Ra (Từ)',
    default: null,
  })
  start_date: Date;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsNotEmpty()
  @Transform((property) =>
    property.value ? Common.transformDate(property.value) : null,
  )
  @ApiProperty({
    required: true,
    type: Date,
    description: 'Thời Gian Diễn Ra (Đến)',
    default: null,
  })
  end_date: Date;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsNotEmpty()
  @Transform((property) =>
    property.value ? Common.transformDate(property.value) : null,
  )
  @ApiProperty({
    required: true,
    type: Date,
    description: 'Thời Gian Hết Hạn Tài Trợ',
    default: null,
  })
  sponsorship_expiration_date: Date;

  @IsOptional()
  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Trạng Thái Hiển Thị',
    default: DisplayStatus.DRAFT,
  })
  display_status: string;

  @ApiHideProperty()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Trạng Thái Tài Trợ',
  })
  sponsorship_status: string;

  @IsOptional()
  // @IsEnum(ProductionStatus)
  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Trạng Thái Sản Xuất',
    default: ProductionStatus.PLANNING,
  })
  production_status: ProductionStatus;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Mô Tả Ngắn',
    default: null,
  })
  short_description: string;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Mô Tả Chi Tiết',
    default: null,
  })
  detailed_description: string;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @ArrayNotEmpty()
  @ArrayMaxSize(20)
  @ApiProperty({
    required: true,
    type: Array<String>,
    description: 'Hình Ảnh Giới Thiệu',
    default: [],
  })
  introduction_images: string[];

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT) ||
      value?.sponsor_hashtags?.length,
  )
  @IsOptional()
  @IsMongoId({ each: true })
  @ApiProperty({
    required: true,
    type: Array<string>,
    description: 'Tags',
  })
  sponsor_hashtags: string[];

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty({
    required: true,
    type: Array<String>,
    description: 'Diễn Viên KOL Tham Gia',
  })
  casts: string[];

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @IsNotEmpty()
  @IsMongoId()
  @Transform((property) =>
    !property?.value || property?.value === '' ? null : property.value,
  )
  @ApiProperty({
    required: true,
    type: String,
    description: 'Thể Loại Chương Trình',
    default: null,
  })
  sponsor_categories: string;

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SponsorPlatformDTO)
  @ApiProperty({
    required: true,
    type: Array<SponsorPlatformDTO>,
    description: 'Nền Tảng',
  })
  platforms?: SponsorPlatformDTO[];

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SponsorShipformDTO)
  @ApiProperty({
    required: true,
    type: Array<SponsorShipformDTO>,
    description: 'Hình Thức Tài Trợ',
  })
  sponsorship_forms?: SponsorShipformDTO[];

  @ValidateIf(
    (value) =>
      !Common.compareValues(value?.display_status, DisplayStatus.DRAFT),
  )
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SponsorshipPackageDto)
  @ApiProperty({
    required: true,
    type: Array<SponsorshipPackageDto>,
    description: 'Hình Thức Tài Trợ',
  })
  sponsorship_packages: SponsorshipPackageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SponsorSchedulerDTO)
  sponsor_schedulers: SponsorSchedulerDTO[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'KPI Dự Kiến',
  })
  sponsor_kpi: string;

  @IsOptional()
  @Type(() => RejectReasonDTO)
  @ApiProperty({
    required: false,
    type: RejectReasonDTO,
    description: 'Lý Do Admin Từ Chối',
  })
  reason_rejected: RejectReasonDTO;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Độ Ưu Tiên Hiển Thị Bài Viết Nổi Bật Trên Client',
  })
  priority: number;
}

export class UpdateSponsorDTO extends CreateSponsorDTO {}
