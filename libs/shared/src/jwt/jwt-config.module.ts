import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENT_VARIABLE } from '@app/common/enums/enviroment.enum';
import { JwtConfigStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get(ENVIROMENT_VARIABLE.JWT_SECRET),
          signOptions: {
            expiresIn: config.get(ENVIROMENT_VARIABLE.JWT_ACCESS_TOKEN_EXPIRE),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtConfigStrategy],
  exports: [JwtConfigStrategy],
})
export class JwtConfigModule {}
