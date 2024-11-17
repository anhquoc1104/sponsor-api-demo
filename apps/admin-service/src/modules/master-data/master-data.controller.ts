import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  forwardRef,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ENUM_MODEL, ENUM_SCOPE, RESPONSE } from '@app/common';
import { BaseController } from '@app/common/base.controller';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { Unprotected, User } from '@app/shared';

@Controller('master-datas')
@ApiTags('Dữ liệu chung')
export class MasterDataController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.MASTER_DATA;

  constructor() {
    // private masterDataService: MasterDataService
    super();
  }

  @Get('ping')
  @ApiOperation({ summary: 'PING' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @Unprotected()
  async findAll(@Query() query: any, @User() user: any) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    return this.returnResponse({ ping: true }, RESPONSE.GET);
  }
}
