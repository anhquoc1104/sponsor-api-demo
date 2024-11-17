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
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DisplayStatus, ProductionStatus } from '@app/modules/sponsor/enums';

class scheduleDetailsDto {
  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  description?: string;
}
class SponsorPlatformDto {
  @IsString()
  @IsOptional()
  platform: string;

  @IsOptional()
  @IsString()
  link?: string;
}

class SponsorSchedulerDto {
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
  @IsString()
  @IsOptional()
  package_name: string;

  @IsString()
  @IsOptional()
  package_unit: string;

  @IsOptional()
  @IsString()
  file: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsNumber()
  @IsOptional()
  package_value: number;
}
class SponsorShipformDto {
  @IsMongoId()
  @IsString()
  @IsOptional()
  sponsorship_form: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  media?: string;
}
export class DraftSponsorDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  sponsor_name?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsString()
  banner_image?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  // @ValidateNested({ each: true })
  // @Type(() => RefDto)
  sponsor_hashtags?: string[];

  @IsOptional()
  @IsMongoId()
  // @ValidateNested({ each: true })
  // @Type(() => RefDto)
  sponsor_categories?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  // @ValidateNested({ each: true })
  // @Type(() => RefDto)
  casts?: string[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => SponsorPlatformDto)
  platforms?: SponsorPlatformDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SponsorShipformDto)
  sponsorship_forms?: SponsorShipformDto;

  @IsOptional()
  @IsEnum(DisplayStatus)
  @Transform(({ value }) => value ?? DisplayStatus.PENDING)
  display_status?: DisplayStatus = DisplayStatus.PENDING;

  @IsOptional()
  @IsEnum(ProductionStatus)
  production_status?: ProductionStatus;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  detailed_description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20, {
    message: 'introduction_images can contain at most 20 image',
  })
  introduction_images?: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  sponsorship_expiration_date?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(10, {
    message: 'sponsorship_packages can contain at most 10 item',
  })
  @Type(() => SponsorshipPackageDto)
  sponsorship_packages?: SponsorshipPackageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SponsorSchedulerDto)
  sponsor_schedulers?: SponsorSchedulerDto[];

  @IsOptional()
  @IsString()
  sponsor_kpi?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date?: Date;

  @IsOptional()
  @IsBoolean()
  product_limited_is_limit?: boolean;

  @IsOptional()
  @IsString()
  product_limited_description?: string;

  @IsNumber()
  @IsOptional()
  priority?: number;
}
