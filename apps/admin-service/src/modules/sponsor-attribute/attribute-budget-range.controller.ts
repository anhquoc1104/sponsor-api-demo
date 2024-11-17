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
import { IAttributeBudgetRange } from '@app/schemas';
import {
  CreateAttributeBudgetRangeDTO,
  FindAttributeBudgetRangeDTO,
  UpdateAttributeBudgetRangeDTO,
  UpdateStatusAttributeBudgetRangeDTO,
} from '@app/modules/sponsor-attribute/dto';
import { AttributeBudgetRangeService } from '@app/modules/sponsor-attribute/attribute-budget-range.service';

@Controller('attributes/budget-ranges')
@ApiTags('Sponsor Budget Range')
export class AttributeBudgetRangeController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.ATTRIBUTE_BUDGET_RANGE;

  constructor(
    private attributeBudgetRangeService: AttributeBudgetRangeService,
  ) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'Danh sách budget range' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(
    @Query() query: FindAttributeBudgetRangeDTO,
    @User() user: IAccessTokenPayload,
  ) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.attributeBudgetRangeService.findAll(query);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Budget range detail' })
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
      const data = await this.attributeBudgetRangeService.findById(id);
      return this.returnResponse(data, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Tạo budget range' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async create(
    @Body() body: CreateAttributeBudgetRangeDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->create ********************`,
      );
      await this.createControllerByUser(body, user);
      const data: IAttributeBudgetRange =
        await this.attributeBudgetRangeService.create(body);

      return await this.returnResponse(data, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa budget range' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async update(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateAttributeBudgetRangeDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->update ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeBudgetRange =
        await this.attributeBudgetRangeService.update(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Change status budget range' })
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
    @Body() body: UpdateStatusAttributeBudgetRangeDTO,
    @User() user: any,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->updateStatus ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeBudgetRange =
        await this.attributeBudgetRangeService.updateStatus(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
