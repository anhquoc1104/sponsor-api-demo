import { ENVIROMENT_VARIABLE } from '@app/common/enums/enviroment.enum';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
@Module({})
export class I18nDynamicModule {
  static forRoot({ path, watch = true }): DynamicModule {
    return {
      module: I18nDynamicModule,
      imports: [
        I18nModule.forRootAsync({
          parser: I18nJsonParser,
          useFactory: (configService: ConfigService) => {
            return {
              fallbackLanguage: configService.get<string>(
                ENVIROMENT_VARIABLE.DEFAULT_LANGUAGE,
              ),
              parserOptions: {
                path,
                // add this to enable live translations
                watch,
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
