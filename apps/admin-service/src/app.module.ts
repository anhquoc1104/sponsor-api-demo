import { Module } from '@nestjs/common';
import { CoreModule } from '@app/shared';
import { AuthController } from './modules/auth/auth.controller';
import { JwtConfigModule } from '@app/shared/jwt/jwt-config.module';
import { RepositoryModule } from '@app/modules/repository.module';
import { GroupController } from './modules/group/group.controller';
import { UserController } from './modules/user/user.controller';
import { MasterDataController } from './modules/master-data/master-data.controller';
import { UploadController } from './modules/upload/upload.controller';
import { AttributeHashTagController } from './modules/sponsor-attribute/attribute-hashtag.controller';
import { SponsorController } from './modules/sponsor/sponsor.controller';
import { AttributeCastController } from './modules/sponsor-attribute/attribute-cast.controller';
import { AttributeCategoryController } from './modules/sponsor-attribute/attribute-category.controller';
import { AttributePlatformController } from './modules/sponsor-attribute/attribute-platform.controller';
import { AttributeController } from './modules/sponsor-attribute/attribute.controller';
import { AttributeBudgetRangeController } from './modules/sponsor-attribute/attribute-budget-range.controller';
import { AttributeSponsorshipBenefitController } from './modules/sponsor-attribute/attribute-sponsorship-benefit.controller';
import { AttributeSponsorshipFormController } from './modules/sponsor-attribute/attribute-sponsorship-form.controller';
import { SettingController } from './modules/setting/setting.controller';
import { AttributeCastProfessionController } from './modules/sponsor-attribute/attribute-cast-profession.controller';
@Module({
  imports: [CoreModule, JwtConfigModule, RepositoryModule],
  controllers: [
    AuthController,
    GroupController,
    UserController,
    MasterDataController,
    UploadController,
    AttributeController,
    AttributeBudgetRangeController,
    AttributeHashTagController,
    AttributeCastController,
    AttributeCastProfessionController,
    AttributeCategoryController,
    AttributePlatformController,
    AttributeSponsorshipBenefitController,
    AttributeSponsorshipFormController,
    SponsorController,
    SettingController,
  ],
  providers: [],
})
export class AppModule {}
