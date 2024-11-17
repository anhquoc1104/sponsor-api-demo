import { ACCOUNT_TYPE, ENUM_MODEL, RESPONSE } from '@app/common/enums';
import { BaseController } from '@app/common/base.controller';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';
import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  NotFoundException,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateSponsorDTO, UpdateStatusDTO } from '@app/modules/sponsor/dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';
import { PERMISSION } from '@app/common/enums/permission.enum';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import {
  RequirePermission,
  Roles,
  throwErrorMessage,
  User,
  Unprotected,
} from '@app/shared';

@Controller('sponsors')
@ApiTags('sponsors')
export class SponsorController extends BaseController {
  model_name = ENUM_MODEL.SPONSOR;

  constructor(private sponsorService: SponsorService) {
    super();
  }

  @Get('')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_SPONSOR])
  @ApiOperation({ summary: 'Get list of sponsors' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAll(@Query() query: any, @User() user: IAccessTokenPayload) {
    try {
      const { request_id, ...filteredQuery } = query;
      const sponsors =
        await this.sponsorService.findAllAvailable(filteredQuery);
      return this.returnResponse(sponsors, RESPONSE.GET);
    } catch (error) {
      this.logger.error(
        `findAll=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get('available')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_SPONSOR])
  @ApiOperation({ summary: 'Get list of sponsors' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAllAvailable(@Query() query: any, @User() user: any): Promise<any> {
    const { request_id, ...filteredQuery } = query;
    const sponsors = await this.sponsorService.findAllAvailable(filteredQuery);
    return this.returnResponse(sponsors, RESPONSE.GET);
  }

  @Get('pending')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_SPONSOR])
  @ApiOperation({ summary: 'Get list of sponsors' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAllPending(@Query() query: any, @User() user: any): Promise<any> {
    const { request_id, ...filteredQuery } = query;
    const sponsors = await this.sponsorService.findAllPending(filteredQuery);
    return this.returnResponse(sponsors, RESPONSE.GET);
  }

  @Get('preview/:id')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_SPONSOR])
  @Unprotected(true)
  @ApiOperation({ summary: 'Get sponsor for preview' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findOneForPreview(@Param('id') id: string): Promise<any> {
    const sponsor = await this.sponsorService.findOneForAdminPreview(id);
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with id ${id} not found`);
    }
    return this.returnResponse(sponsor, RESPONSE.GET);
  }

  @Get(':id')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.VIEW_SPONSOR])
  @Unprotected(true)
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
  async findById(@Param('id') id: string): Promise<any> {
    const sponsor = await this.sponsorService.findOneForAdmin(id);
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with id ${id} not found`);
    }
    return this.returnResponse(sponsor, RESPONSE.GET);
  }

  @Put(':id')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.UPDATE_SPONSOR])
  @ApiOperation({ summary: 'Update Sponsor From Admin' })
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
      const updatedSponsor = await this.sponsorService.update(
        id,
        payload,
        user,
      );
      return this.returnResponse(updatedSponsor, RESPONSE.UPDATE);
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

  @Put(':id/status')
  @Roles(ACCOUNT_TYPE.ADMIN)
  @RequirePermission([PERMISSION.UPDATE_SPONSOR])
  @ApiOperation({ summary: 'Update Sponsor Status From Admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sponsor has been successfully created.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdateStatusDTO,
    @User() user: IAccessTokenPayload,
  ) {
    try {
      payload = await this.updateControllerByUser(payload, user);
      const sponsor = await this.sponsorService.updateStatus(id, payload);
      return this.returnResponse(sponsor, RESPONSE.UPDATE_STATUS);
    } catch (error) {
      this.logger.error(
        `updateStatus=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
