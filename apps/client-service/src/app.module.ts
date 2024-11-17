import { Module } from '@nestjs/common';
import { CoreModule } from '@app/shared';
import { JwtConfigModule } from '@app/shared/jwt/jwt-config.module';
import { RepositoryModule } from '@app/modules/repository.module';
import { SponsorController } from './modules/sponsor/sponsor.controller';
import { AttributeController } from './modules/sponsor-attribute/attribute.controller';
import { AuthController } from './modules/auth/auth.controller';
import { SettingController } from './modules/setting/setting.controller';
import { GroupController } from './modules/group/group.controller';
import { UploadController } from './modules/upload/upload.controller';
@Module({
  imports: [CoreModule, JwtConfigModule, RepositoryModule],
  controllers: [
    AuthController,
    AttributeController,
    SponsorController,
    SettingController,
    GroupController,
    UploadController,
  ],
  providers: [],
})
export class AppModule {}
