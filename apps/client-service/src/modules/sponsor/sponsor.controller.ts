import { ACCOUNT_TYPE, ENUM_MODEL, RESPONSE } from '@app/common/enums';
import { BaseController } from '@app/common/base.controller';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';
import { Roles, User, ValidateObjectIdPipe, Unprotected } from '@app/shared';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';

@Controller('sponsors')
@ApiTags('sponsors')
export class SponsorController extends BaseController {
  model_name = ENUM_MODEL.SPONSOR;

  constructor(private sponsorService: SponsorService) {
    super();
  }

  @Get('calendar')
  @Roles(ACCOUNT_TYPE.CLIENT)
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAllForCalendar(
    @Query() query: any,
    @User() user: any,
  ): Promise<any> {
    const datas = await this.sponsorService.findAllForCalendar(query);
    return this.returnResponse(datas, RESPONSE.GET);
  }

  @Get('home')
  @Roles(ACCOUNT_TYPE.CLIENT)
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAllForClientHomePage(
    @Query() query: any,
    @User() user: any,
  ): Promise<any> {
    const datas = await this.sponsorService.findAllForClientHomePage(query);
    return this.returnResponse(datas, RESPONSE.GET);
  }

  @Get('')
  @Roles(ACCOUNT_TYPE.CLIENT)
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAllForClient(@Query() query: any, @User() user: any): Promise<any> {
    const datas = await this.sponsorService.findAllForClient(query);
    return this.returnResponse(datas, RESPONSE.GET);
  }

  @Get('short-detail/:id')
  @Unprotected()
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findSponsorShortDetail(
    @Param('id', new ValidateObjectIdPipe()) id,
  ): Promise<any> {
    const data = await this.sponsorService.findSponsorShortDetailForSocial(id);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Get(':id')
  @Roles(ACCOUNT_TYPE.CLIENT)
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findById(@Param('id', new ValidateObjectIdPipe()) id): Promise<any> {
    const data = await this.sponsorService.findOneForClient(id);
    return this.returnResponse(data, RESPONSE.GET);
  }

  // Client gởi mail liên hệ sponsor
  @Roles(ACCOUNT_TYPE.CLIENT)
  @Post('send-email-detail-sponsor')
  async sendEmail(
    @Body()
    body: {
      customer_email: string;
      issue_description: string;
      sponsor_id: string;
    },
  ) {
    const { customer_email, issue_description, sponsor_id } = body;
    if (!sponsor_id || !customer_email || !issue_description) {
      throw new HttpException(
        'Customer email is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.sponsorService.sendDetailSponsorEmail(body);
      return {
        message: 'Gởi email thành công!',
      };
    } catch (error) {
      this.logger.error(error?.message || error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Client gởi mail nhanh
  @Post('send-custom-email')
  @Unprotected(true)
  async sendContactEmail(@Body() body: { customer_email: string }) {
    if (!body?.customer_email) {
      throw new HttpException(
        'Customer email is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.sponsorService.sendCustomEmail(body);
      return {
        message: 'Gởi email thành công!',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Client gởi mail liên hệ
  @Post('send-contact-email')
  @Unprotected(true)
  async sendCustomEmail(
    @Body()
    body: {
      customer_email: string;
      issue_description: string;
      customer_name: string;
    },
  ) {
    if (!body.customer_email) {
      throw new HttpException(
        'Customer email is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.sponsorService.sendContactEmail(body);
      return {
        message: 'Gởi email thành công!',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
