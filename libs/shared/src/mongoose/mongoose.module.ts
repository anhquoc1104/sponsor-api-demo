import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongooseDynamicModuleOptions } from './interfaces/mongoose-dynamic-module-options.interface';
import { ENVIROMENT_VARIABLE } from '@app/common/enums/enviroment.enum';
import { CONNECTION_NAME } from '@app/common/enums';

@Module({})
export class MongooseDynamicModule {
  static registerAsync({
    connectionName = CONNECTION_NAME.PRIMARY,
  }: MongooseDynamicModuleOptions): DynamicModule {
    return {
      module: MongooseDynamicModule,
      imports: [
        MongooseModule.forRootAsync({
          connectionName,
          useFactory: (
            configService: ConfigService,
          ): MongooseModuleFactoryOptions => ({
            uri: this.getMongooseUriByConnectionName(
              connectionName,
              configService,
            ),
            // useUnifiedTopology: true,
            maxPoolSize: configService.get(ENVIROMENT_VARIABLE.MAX_POOL_SIZE),
            serverSelectionTimeoutMS: configService.get(
              ENVIROMENT_VARIABLE.SERVER_MONGO_SELECTION_TIMEMOUT,
            ),
            connectTimeoutMS: configService.get(
              ENVIROMENT_VARIABLE.SERVER_MONGO_CONNECT_TIMEOUT,
            ), // Give up initial connection after 10 seconds
            socketTimeoutMS: configService.get(
              ENVIROMENT_VARIABLE.SERVER_MONGO_SOCKET_TIMEOUT,
            ), // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            retryAttempts: 5,
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
    };
  }

  static getMongooseUriByConnectionName(
    connectionName: keyof typeof CONNECTION_NAME,
    configService: ConfigService,
  ) {
    switch (connectionName) {
      case CONNECTION_NAME.PRIMARY:
        return configService.get(ENVIROMENT_VARIABLE.MONGO_URI);
      case CONNECTION_NAME.SECONDARY:
        return configService.get(ENVIROMENT_VARIABLE.MONGO_URI_READONLY);
      default:
        return configService.get(ENVIROMENT_VARIABLE.MONGO_URI);
    }
  }
}
