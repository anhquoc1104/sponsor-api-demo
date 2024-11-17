import { ACCOUNT_TYPE, BaseController, RESPONSE } from '@app/common';
import { PERMISSION } from '@app/common/enums/permission.enum';
import { RequirePermission, Roles, throwErrorMessage, User } from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
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
import { ApiOperation } from '@nestjs/swagger';
import { GroupService } from '@app/modules/group/group.service';
import {
  CreateGroupDTO,
  FindGroupDTO,
  UpdateGroupDTO,
  UpdateGroupStatusDTO,
} from './group.dto';

@Controller('group')
export class GroupController extends BaseController {
  constructor(private readonly groupService: GroupService) {
    super();
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.CREATE_GROUP])
  @ApiOperation({ summary: 'Create User Group (ONLY ADMIN SERVICE)' })
  async create(
    @Body() payload: CreateGroupDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.createControllerByUser(payload, user);
      const response = await this.groupService.create(payload);
      return this.returnResponse(response, RESPONSE.CREATE);
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
  @RequirePermission([PERMISSION.VIEW_GROUP])
  @ApiOperation({ summary: 'View Group Information (ONLY ADMIN SERVICE)' })
  async getInformation(@Param('id') id: string) {
    try {
      const user = await this.groupService.getInformation(id);
      return this.returnResponse(user, RESPONSE.GET);
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
  @RequirePermission([PERMISSION.UPDATE_GROUP])
  @ApiOperation({ summary: 'Update Group (ONLY ADMIN SERVICE)' })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateGroupDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const response = await this.groupService.update(id, payload);
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
  @RequirePermission([PERMISSION.VIEW_GROUP])
  @ApiOperation({ summary: 'Get Groups (ONLY ADMIN SERVICE)' })
  async findAll(
    @Query() query: FindGroupDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      const response = await this.groupService.findAll(query);
      return this.returnResponse(response, RESPONSE.GET);
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
  @RequirePermission([PERMISSION.UPDATE_GROUP])
  @ApiOperation({ summary: 'Update Group (ONLY ADMIN SERVICE)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdateGroupStatusDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const response = await this.groupService.updateStatus(id, payload);
      return this.returnResponse(response, RESPONSE.UPDATE_STATUS);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
