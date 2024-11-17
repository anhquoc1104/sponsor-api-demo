import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ACCOUNT_TYPE,
  BaseController,
  ENUM_MODEL,
  PERMISSION,
  RESPONSE,
} from '@app/common';
import {
  RequirePermission,
  Roles,
  throwErrorMessage,
  User,
  ValidateObjectIdPipe,
} from '@app/shared';
import { ISetting } from '@app/schemas/setting.schema';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { SettingService } from '@app/modules/setting/setting.service';
import {
  CreateSettingDTO,
  FindSettingDTO,
  UpdateSettingDTO,
  UpdateStatusSettingDTO,
} from '@app/modules/setting/dto';

@Controller('settings')
@ApiTags('Cấu hình chung')
export class SettingController extends BaseController {
  model_name = ENUM_MODEL.SETTING;

  constructor(private settingService: SettingService) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'List setting' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(
    @Query() query: FindSettingDTO,
    @User() user: IAccessTokenPayload,
  ) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.settingService.findAll(query);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Setting Detail' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.CREATE_ACCOUNT])
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

  @Post('')
  @ApiOperation({ summary: 'Create setting' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async create(
    @Body() body: CreateSettingDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->create ********************`,
      );
      await this.createControllerByUser(body, user);
      const data: ISetting = await this.settingService.create(body);

      return this.returnResponse(data, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update setting' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async update(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateSettingDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->update ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: ISetting = await this.settingService.update(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Change status setting' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  async updateStatus(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateStatusSettingDTO,
    @User() user: any,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->updateStatus ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: ISetting = await this.settingService.updateStatus(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
