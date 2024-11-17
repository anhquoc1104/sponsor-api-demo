import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { DisplayStatus } from '@app/modules/sponsor/enums';
import { BaseUpdateDTO, Common } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDTO extends BaseUpdateDTO {
  @IsEnum(DisplayStatus)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Trạng Thái Hiển Thị',
  })
  display_status: string;

  @ValidateIf((value) =>
    Common.compareValues(value?.display_status, DisplayStatus.REFUSE),
  )
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Lý Do Từ Chối',
  })
  reason: string;
}
