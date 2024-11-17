import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryFilterDTO } from '@app/common/dto/base-query.dto';

export enum EventType {
  MESSAGE = 'MESSAGE',
  SAVE_LOCATION = 'SAVE_LOCATION',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}
export class ProcessUpdateSocketDTO extends BaseQueryFilterDTO {
  @IsNotEmpty()
  room_id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: EventType,
    description: 'cmd type',
  })
  cmd_type: EventType;

  @ApiProperty({
    required: false,
    example: '',
    description: 'message type',
  })
  message_type: string;

  @ApiProperty({
    required: false,
    example: '',
    description: 'message',
  })
  message: any;

  @ApiProperty({
    required: false,
    example: '',
    description: 'store_id',
  })
  store_id: any;

  @ApiProperty({
    required: false,
    example: '',
    description: 'store_id',
  })
  is_passed: boolean;

  @ApiProperty({
    required: false,
    example: '',
    description: 'user_id',
  })
  user_id: any;
  @ApiProperty({
    required: false,
    example: '',
    description: 'process_type',
  })
  process_type: any;
}
