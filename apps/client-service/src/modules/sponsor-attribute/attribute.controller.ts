import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ACCOUNT_TYPE, ENUM_MODEL, PERMISSION, RESPONSE } from '@app/common';
import { BaseController } from '@app/common/base.controller';
import { Roles, throwErrorMessage, Unprotected, User } from '@app/shared';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { AttributeService } from '@app/modules/sponsor-attribute/attribute.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('attributes/all-data')
@ApiTags('All data attributes')
export class AttributeController extends BaseController {
  logger: Logger = new Logger(this.constructor.name);
  model_name = ENUM_MODEL.ATTRIBUTE;

  constructor(
    private attributeService: AttributeService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'All data attribute' })
  @Roles(ACCOUNT_TYPE.CLIENT)
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Success',
  })
  async findAll(@Query() query: any, @User() user: IAccessTokenPayload) {
    this.logger.log(
      `******************** START_FUNCTION->findAll ********************`,
    );
    const data = await this.attributeService.findAllForClient(query);
    return this.returnResponse(data, RESPONSE.GET);
  }

  @Post()
  @Roles(ACCOUNT_TYPE.CLIENT)
  async blobPDf(@Body() payload: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(payload.url, { responseType: 'arraybuffer' }),
      );
      return this.returnResponse(
        { data: Buffer.from(response.data, 'binary').toString('base64') },
        RESPONSE.GET,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}
