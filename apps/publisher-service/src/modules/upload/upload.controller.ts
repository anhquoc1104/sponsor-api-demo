import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { BaseController, ENVIROMENT_VARIABLE } from '@app/common';
import { Unprotected } from '@app/shared';
import multerOptions from '@app/shared/config/upload.config';

@Controller('uploads')
@ApiTags('upload image and file')
export class UploadController extends BaseController {
  @Inject()
  configService: ConfigService;

  constructor() {
    super();
  }

  @Post('media')
  @Unprotected()
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    if (!files || files.length === 0) {
      throw new HttpException(
        this.i18n.translate('errors.E0004'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileDetails = files.map((file) => {
      const path = `${file.destination}`.replace('./public', '/public');
      file.path =
        // this.configService.get(ENVIROMENT_VARIABLE.SERVER_MEDIA_URL) +
        path + '/' + file.filename;
      return {
        ...file,
        filename: file.filename,
      };
    });

    return {
      files: fileDetails,
    };
  }
}
