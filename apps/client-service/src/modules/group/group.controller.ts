import { ACCOUNT_TYPE, BaseController, RESPONSE } from '@app/common';
import { Roles, throwErrorMessage, User } from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import {
  Controller,
  Get,
  HttpException,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GroupService } from '@app/modules/group/group.service';
import { FindGroupDTO } from './group.dto';

@Controller('group')
export class GroupController extends BaseController {
  constructor(private readonly groupService: GroupService) {
    super();
  }

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.CLIENT)
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
}
