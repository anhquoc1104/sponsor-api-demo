import {
  ENUM_GLOBAL_VARIABLE,
  ENUM_RESOURCE_SYSTEM,
  ENVIROMENT_VARIABLE,
} from '@app/common';
import { Common } from '@app/common/functions';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ENUM_VERSION } from '@app/common/enums/enviroment.enum';
// import { RedisIoAdapter } from './events/socket/redis.adapter';

global[ENUM_GLOBAL_VARIABLE.resource_system_name] =
  ENUM_RESOURCE_SYSTEM.ADMIN_WEB;
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {});

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.enableCors();

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ENUM_VERSION.V1,
    });

    app.use(compression());

    const configService = app.get<ConfigService>(ConfigService);

    // write logs
    const logger: any[] = ['log', 'error', 'verbose', 'warn'];
    if (
      Common.valueToBoolean(configService.get(ENVIROMENT_VARIABLE.IS_DEBUG))
    ) {
      logger.push('debug');
      mongoose.set('debug', true);
    }
    app.useLogger(logger);

    // add swagger
    const options = new DocumentBuilder()
      .setTitle('Sponsor API Admin')
      .setDescription('The Sponsor API description')
      .setVersion('1.0')
      .addTag('Auth')
      .addBearerAuth(
        {
          description: `Please enter token in following format: <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'Authorization',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    // const redisIoAdapter = new RedisIoAdapter(app);
    // await redisIoAdapter.connectToRedis(configService);
    // app.useWebSocketAdapter(redisIoAdapter); // Move to socket-service

    await app.startAllMicroservices();

    const server = await app.listen(
      configService.get(ENVIROMENT_VARIABLE.ADMIN_API_PORT),
      '0.0.0.0',
    );
    server.setTimeout(
      Number(configService.get(ENVIROMENT_VARIABLE.SERVER_REQUEST_TIMEMOUT)) ??
        2000000,
    );

    console.log(
      `Environment: ${configService.get(ENVIROMENT_VARIABLE.ENVIRONMENT)}`,
    );
    console.log(`Application is running on port: ${server.address().port}`);
    console.log(`ADMIN URL: ${await app.getUrl()}`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
