import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ACCOUNT_TYPE, ENUM_MODEL, PERMISSION, RESPONSE } from '@app/common';
import { BaseController } from '@app/common/base.controller';
import {
  RequirePermission,
  Roles,
  throwErrorMessage,
  User,
  ValidateObjectIdPipe,
} from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import {
  CreateAttributeSponsorshipBenefitDTO,
  FindAttributeSponsorshipBenefitDTO,
  UpdateAttributeSponsorshipBenefitDTO,
  UpdateStatusAttributeSponsorshipBenefitDTO,
} from '@app/modules/sponsor-attribute/dto';
import { AttributeSponsorshipBenefitService } from '@app/modules/sponsor-attribute/attribute-sponsorship-benefit.service';
import { IAttributeSponsorshipBenefit } from '@app/schemas';

@Controller('attributes/sponsorship-benefits')
@ApiTags('Sponsor Sponsorship Benefit')
export class AttributeSponsorshipBenefitController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_BENEFIT;

  constructor(
    private attributeSponsorshipBenefitService: AttributeSponsorshipBenefitService,
  ) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'Danh sách nhóm quyền lợi tài trợ' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(
    @Query() query: FindAttributeSponsorshipBenefitDTO,
    @User() user: IAccessTokenPayload,
  ) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.attributeSponsorshipBenefitService.findAll(query);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết nhóm quyền lợi tài trợ' })
  @ApiParam({
    required: true,
    name: 'id',
    type: String,
    example: '5f7d28d11f992e1359a007f9',
    description: 'Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  async findById(@Param('id', new ValidateObjectIdPipe()) id) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->findById ********************`,
      );
      const data = await this.attributeSponsorshipBenefitService.findById(id);
      return this.returnResponse(data, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Tạo nhóm quyền lợi tài trợ' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async create(
    @Body() body: CreateAttributeSponsorshipBenefitDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->create ********************`,
      );
      await this.createControllerByUser(body, user);
      const data: IAttributeSponsorshipBenefit =
        await this.attributeSponsorshipBenefitService.create(body);

      return this.returnResponse(data, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa nhóm quyền lợi tài trợ' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async update(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateAttributeSponsorshipBenefitDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->update ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeSponsorshipBenefit =
        await this.attributeSponsorshipBenefitService.update(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Change status nhóm quyền lợi tài trợ' })
  @ApiParam({
    required: true,
    name: 'id',
    type: String,
    example: '5f7d28d11f992e1359a007f9',
    description: 'Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  async updateStatus(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateStatusAttributeSponsorshipBenefitDTO,
    @User() user: any,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->updateStatus ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeSponsorshipBenefit =
        await this.attributeSponsorshipBenefitService.updateStatus(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}