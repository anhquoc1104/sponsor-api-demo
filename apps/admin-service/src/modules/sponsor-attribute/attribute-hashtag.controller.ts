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
import { AttributeHashtagService } from '@app/modules/sponsor-attribute/attribute-hashtag.service';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { IAttributeHashtag } from '@app/schemas';
import {
  CreateAttributeTagDTO,
  FindAttributeTagDTO,
  UpdateAttributeTagDTO,
  UpdateStatusAttributeTagDTO,
} from '@app/modules/sponsor-attribute/dto/hashtag';

@Controller('attributes/tags')
@ApiTags('Sponsor Tags')
export class AttributeHashTagController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.ATTRIBUTE_HASHTAG;

  constructor(private attributeHashtagService: AttributeHashtagService) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'Danh sách tag' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(
    @Query() query: FindAttributeTagDTO,
    @User() user: IAccessTokenPayload,
  ) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.attributeHashtagService.findAll(query);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hashtag Detail' })
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
      const data = await this.attributeHashtagService.findById(id);
      return this.returnResponse(data, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Tạo tag' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async create(
    @Body() body: CreateAttributeTagDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->create ********************`,
      );
      await this.createControllerByUser(body, user);
      const data: IAttributeHashtag =
        await this.attributeHashtagService.create(body);

      return this.returnResponse(data, RESPONSE.CREATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa tag' })
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.APPROVE_SPONSOR])
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async update(
    @Param('id', new ValidateObjectIdPipe()) id,
    @Body() body: UpdateAttributeTagDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->update ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeHashtag = await this.attributeHashtagService.update(
        id,
        body,
      );

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Change status tag' })
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
    @Body() body: UpdateStatusAttributeTagDTO,
    @User() user: any,
  ) {
    try {
      this.logger.log(
        `******************** START_FUNCTION->updateStatus ********************`,
      );
      await this.updateControllerByUser(body, user);
      const data: IAttributeHashtag =
        await this.attributeHashtagService.updateStatus(id, body);

      return this.returnResponse(data, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}