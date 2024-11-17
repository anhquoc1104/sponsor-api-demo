import { Module } from '@nestjs/common';
import { CoreModule } from '@app/shared';
import { JwtConfigModule } from '@app/shared/jwt/jwt-config.module';
import { RepositoryModule } from '@app/modules/repository.module';
import { SponsorController } from './modules/sponsor/sponsor.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AttributeController } from './modules/sponsor-attribute/attribute.controller';
import { UploadController } from './modules/upload/upload.controller';
import { GroupController } from './modules/group/group.controller';

@Module({
  imports: [CoreModule, JwtConfigModule, RepositoryModule],
  controllers: [
    SponsorController,
    AuthController,
    AttributeController,
    UploadController,
    GroupController,
  ],
  providers: [],
})
export class AppModule {}
