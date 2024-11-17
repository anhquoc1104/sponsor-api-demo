import { BaseController } from '@app/common/base.controller';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDTO,
  FindUserDTO,
  ResetPasswordDTO,
  UpdateUserDTO,
  UpdateUserStatusDTO,
} from './user.dto';
import { RequirePermission, Roles, throwErrorMessage, User } from '@app/shared';
import { UserService } from '@app/modules/user/user.service';
import { ACCOUNT_TYPE, RESPONSE } from '@app/common';
import { PERMISSION } from '@app/common/enums/permission.enum';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { PERMISSION_FRAME } from '@app/common/constants/permission.constant';

@Controller('user')
@ApiTags('Accounts')
export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.CREATE_ACCOUNT])
  @ApiOperation({ summary: 'Create Account (ONLY ADMIN SERVICE)' })
  async create(
    @Body() payload: CreateUserDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.createControllerByUser(payload, user);
      const response = await this.service.create(payload);
      return this.returnResponse(response, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.UPDATE_ACCOUNT])
  @ApiOperation({ summary: 'Update Account (ONLY ADMIN SERVICE)' })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const response = await this.service.update(id, payload);
      return this.returnResponse(response, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_ACCOUNT, PERMISSION.VIEW_SPONSOR])
  @ApiOperation({ summary: 'Update Account (ONLY ADMIN SERVICE)' })
  async findAll(
    @Query() query: FindUserDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      const response = await this.service.findAll(query);
      return this.returnResponse(response, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_ACCOUNT])
  @ApiOperation({ summary: 'View Detail Account (ONLY ADMIN SERVICE)' })
  async getInformation(@Param('id') id: string) {
    try {
      const user = await this.service.getInformation(id);
      return this.returnResponse(user, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('reset-password/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.UPDATE_ACCOUNT])
  @ApiOperation({ summary: 'Update Account Password (ONLY ADMIN SERVICE)' })
  async resetPassword(
    @Param('id') id: string,
    @Body() payload: ResetPasswordDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const response = await this.service.resetPassword(id, payload);
      return this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get('/permissions/frame')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_ACCOUNT])
  @ApiOperation({ summary: 'View Permission Frame (ONLY ADMIN SERVICE)' })
  async getPermissionFrame() {
    try {
      return this.returnResponse(PERMISSION_FRAME, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('status/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.UPDATE_ACCOUNT])
  @ApiOperation({ summary: 'Update Account Status (ONLY ADMIN SERVICE)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdateUserStatusDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const response = await this.service.updateStatus(id, payload);
      return this.returnResponse(response, RESPONSE.UPDATE_STATUS);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
