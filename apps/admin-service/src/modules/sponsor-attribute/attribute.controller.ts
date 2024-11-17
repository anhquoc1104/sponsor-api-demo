import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ACCOUNT_TYPE, ENUM_MODEL, PERMISSION, RESPONSE } from '@app/common';
import { BaseController } from '@app/common/base.controller';
import { RequirePermission, Roles, Unprotected, User } from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { AttributeService } from '@app/modules/sponsor-attribute/attribute.service';

@Controller('attributes/all-data')
@ApiTags('All data attributes')
export class AttributeController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.ATTRIBUTE;

  constructor(private attributeService: AttributeService) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'All data attribute' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(@Query() query: any, @User() user: IAccessTokenPayload) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.attributeService.findAll(query);
    return this.returnResponse(data, RESPONSE.GET);
  }
}
