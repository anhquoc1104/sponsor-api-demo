import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ENVIROMENT, LANGUAGE } from '@app/common/enums/enviroment.enum';

class EnvironmentVariables {
  //#region VERSION MODE & PORTS
  @IsEnum(ENVIROMENT)
  @IsString()
  @IsNotEmpty()
  ENVIRONMENT: ENVIROMENT;

  @IsBoolean()
  @IsNotEmpty()
  IS_DEBUG: Boolean;

  @IsNumber()
  @IsNotEmpty()
  CLIENT_API_PORT: Number;

  @IsNumber()
  @IsNotEmpty()
  ADMIN_API_PORT: Number;

  @IsNumber()
  @IsNotEmpty()
  PUBLISHER_API_PORT: Number;

  @IsNumber()
  @IsNotEmpty()
  SCHUDULER_API_PORT: Number;
  //#endregion

  //#region DATABASES & REDIS
  @IsString()
  @IsNotEmpty()
  MONGO_URI: String;

  @IsString()
  @IsNotEmpty()
  MONGO_URI_READONLY: String;

  @IsNumber()
  @IsNotEmpty()
  ASYNC_POOL: Number;

  @IsNumber()
  @IsNotEmpty()
  MAX_POOL_SIZE: Number;

  @IsNumber()
  @IsNotEmpty()
  PROCESS_PER_ASYNC_POOL: Number;

  @IsNumber()
  @IsNotEmpty()
  SERVER_REQUEST_TIMEMOUT: Number;

  @IsNumber()
  @IsNotEmpty()
  SERVER_MONGO_SELECTION_TIMEMOUT: Number;

  @IsNumber()
  @IsNotEmpty()
  SERVER_MONGO_CONNECT_TIMEOUT: Number;

  @IsNumber()
  @IsNotEmpty()
  SERVER_MONGO_SOCKET_TIMEOUT: Number;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: String;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: Number;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: String;
  //#endregion

  //#region GENERAL CONFIGS
  @IsString()
  @IsNotEmpty()
  HOST_NAME: String;

  @IsEnum(LANGUAGE)
  @IsString()
  @IsNotEmpty()
  DEFAULT_LANGUAGE: LANGUAGE;
  //#endregion

  //#region PORTAL URL
  @IsString()
  @IsNotEmpty()
  ADMIN_WEB_URL: String;

  @IsString()
  @IsNotEmpty()
  CLIENT_WEB_URL: String;

  @IsString()
  @IsNotEmpty()
  PUBLISHER_WEB_URL: String;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: String;

  @IsNumber()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRE: Number;

  @IsNumber()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRE: Number;
  //#endregion
}

export function validate(config: Record<string, unknown>) {
  const validatingConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatingConfig, {
    skipMissingProperties: false,
  });
  if (errors?.length) {
    const errorResponse = errors.map((element) => {
      return {
        property: element.property,
        messages: Object.values(element.constraints),
      };
    });
    throw new Error(JSON.stringify(errorResponse));
  }
  return validatingConfig;
}
