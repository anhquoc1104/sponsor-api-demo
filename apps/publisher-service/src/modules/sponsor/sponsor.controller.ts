import { ACCOUNT_TYPE, ENUM_MODEL, RESPONSE } from '@app/common/enums';
import { BaseController } from '@app/common/base.controller';
import { User } from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  HttpException,
  Param,
  Put,
} from '@nestjs/common';
import { throwErrorMessage, Roles } from '@app/shared';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';
import { CreateSponsorDTO, UpdateSponsorDTO } from '@app/modules/sponsor/dto';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';

@Controller('sponsors')
@ApiTags('sponsors')
export class SponsorController extends BaseController {
  model_name = ENUM_MODEL.SPONSOR;

  constructor(private readonly _service: SponsorService) {
    super();
  }

  @Get('')
  @Roles(ACCOUNT_TYPE.PUBLISHER)
  @ApiOperation({ summary: 'Get list of sponsors' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAll(
    @Query() query: any,
    @User() user: IAccessTokenPayload,
  ): Promise<any> {
    query['created_by'] = user.sub;
    const sponsors = await this._service.findAllForPublisher(query);
    return this.returnResponse(sponsors, RESPONSE.GET);
  }

  @Get(':id')
  @Roles(ACCOUNT_TYPE.PUBLISHER)
  @ApiOperation({ summary: 'Get sponsor by id' })
  @ApiResponse({
    status: 200,
    description: 'Sponsor found',
  })
  @ApiResponse({
    status: 404,
    description: 'Sponsor not found',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findById(@Param('id') id: string) {
    try {
      const sponsor = await this._service.findOneForPublisher(id);
      return this.returnResponse(sponsor, RESPONSE.GET);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Post('')
  @Roles(ACCOUNT_TYPE.PUBLISHER)
  @ApiOperation({ summary: 'Create New Sponsor From Publisher' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The sponsor has been successfully created.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateSponsorDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.createControllerByUser(payload, user);
      const sponsor = await this._service.create(payload);
      return this.returnResponse(sponsor, RESPONSE.CREATE);
    } catch (error) {
      this.logger.error(
        `create=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(ACCOUNT_TYPE.PUBLISHER)
  @ApiOperation({ summary: 'Update Sponsor From Publisher' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sponsor has been successfully created.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateSponsorDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const sponsor = await this._service.update(id, payload, user);
      return this.returnResponse(sponsor, RESPONSE.UPDATE);
    } catch (error) {
      this.logger.error(
        `update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
