import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ACCOUNT_TYPE,
  BaseController,
  ENUM_MODEL,
  RESPONSE,
} from '@app/common';
import { Roles, throwErrorMessage, ValidateObjectIdPipe } from '@app/shared';
import { SettingService } from '@app/modules/setting/setting.service';

@Controller('settings')
@ApiTags('Cấu hình chung')
export class SettingController extends BaseController {
  model_name = ENUM_MODEL.SETTING;

  constructor(private settingService: SettingService) {
    super();
  }

  @Get('by-key/:key')
  @ApiOperation({ summary: 'Setting By Key' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Roles(ACCOUNT_TYPE.CLIENT)
  async findByKey(@Param('key') key) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->findByKey ********************`,
      );
      const data = await this.settingService.findByKey(key);
      return this.returnResponse(data, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Setting Detail' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Roles(ACCOUNT_TYPE.CLIENT)
  async findById(@Param('id', new ValidateObjectIdPipe()) id) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->findById ********************`,
      );
      const data = await this.settingService.findById(id);
      return this.returnResponse(data, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
