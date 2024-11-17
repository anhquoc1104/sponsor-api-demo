import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION, CONNECTION_NAME } from '@app/common';
import {
  CacheDynamicModule,
  Cryptography,
  MongooseDynamicModule,
} from '@app/shared';
import {
  AttributeCast,
  AttributeCastSchema,
  AttributeCategory,
  AttributeCategorySchema,
  AttributeHashtag,
  AttributeHashtagSchema,
  AttributePlatform,
  AttributePlatformSchema,
  AttributeSponsorshipBenefit,
  AttributeSponsorshipBenefitSchema,
  AttributeSponsorshipForm,
  AttributeSponsorshipFormSchema,
  AttributeBudgetRange,
  AttributeBudgetRangeSchema,
  Group,
  GroupSchema,
  MasterData,
  MasterDataSchema,
  Sponsor,
  SponsorSchema,
  User,
  UserSchema,
  SponsorLog,
  SponsorLogSchema,
  AttributeCastProfession,
  AttributeCastProfessionSchema,
} from '@app/schemas';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { UserService } from '@app/modules/user/user.service';
import { SponsorService } from '@app/modules/sponsor/sponsor.service';
import { Blacklist, BlacklistSchema } from '@app/schemas/blacklist.schema';
import { Session, SessionSchema } from '@app/schemas/session.schema';
import { GroupService } from './group/group.service';
import { SessionService } from './session/session.service';
import { BlacklistService } from './blacklist/blacklist.service';
import { JwtConfigModule } from '@app/shared/jwt/jwt-config.module';
import { AuthConfigStrategy } from './blacklist/auth.strategy';
import { AttributeCastService } from './sponsor-attribute/attribute-cast.service';
import { AttributeCategoryService } from './sponsor-attribute/attribute-category.service';
import { AttributeHashtagService } from './sponsor-attribute/attribute-hashtag.service';
import { AttributePlatformService } from './sponsor-attribute/attribute-platform.service';
import { AttributeBudgetRangeService } from './sponsor-attribute/attribute-budget-range.service';
import { AttributeSponsorshipFormService } from './sponsor-attribute/attribute-sponsorship-form.service';
import { AttributeSponsorshipBenefitService } from './sponsor-attribute/attribute-sponsorship-benefit.service';
import { AttributeService } from './sponsor-attribute/attribute.service';
import { Setting, SettingSchema } from '@app/schemas/setting.schema';
import { SettingService } from './setting/setting.service';
import { MailModule } from '@app/shared/mail/mail.module';
import { AttributeCastProfessionService } from './sponsor-attribute/attribute-cast-profession.service';
@Global()
@Module({
  imports: [
    JwtConfigModule,
    CacheDynamicModule.register(),
    MongooseDynamicModule.registerAsync({
      connectionName: CONNECTION_NAME.PRIMARY,
    }),
    MongooseDynamicModule.registerAsync({
      connectionName: CONNECTION_NAME.SECONDARY,
    }),
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          imports: [],
          useFactory: () => {
            const schema = UserSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.USER,
        },
        {
          name: MasterData.name,
          imports: [],
          useFactory: () => {
            const schema = MasterDataSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.MASTER_DATA,
        },
        {
          name: Group.name,
          imports: [],
          useFactory: () => {
            const schema = GroupSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.GROUP,
        },
        {
          name: Sponsor.name,
          imports: [],
          useFactory: () => {
            const schema = SponsorSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.SPONSOR,
        },
        {
          name: Blacklist.name,
          imports: [],
          useFactory: () => {
            const schema = BlacklistSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.BLACKLIST,
        },
        {
          name: Session.name,
          imports: [],
          useFactory: () => {
            const schema = SessionSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.SESSION,
        },
        {
          name: AttributeCast.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeCastSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CAST,
        },
        {
          name: AttributeCastProfession.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeCastProfessionSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CAST_PROFESSION,
        },
        {
          name: AttributeCategory.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeHashtagSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CATEGORY,
        },
        {
          name: AttributeHashtag.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeHashtagSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_HASHTAG,
        },
        {
          name: AttributePlatform.name,
          imports: [],
          useFactory: () => {
            const schema = AttributePlatformSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_PLATFORM,
        },
        {
          name: AttributeSponsorshipBenefit.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeSponsorshipBenefitSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
        },
        {
          name: AttributeSponsorshipForm.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeSponsorshipFormSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
        },
        {
          name: AttributeBudgetRange.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeBudgetRangeSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_BUDGET_RANGE,
        },
        {
          name: SponsorLog.name,
          imports: [],
          useFactory: () => SponsorLogSchema,
          inject: [],
          collection: COLLECTION.SPONSOR_LOG,
        },
        {
          name: Setting.name,
          imports: [],
          useFactory: () => SettingSchema,
          inject: [],
          collection: COLLECTION.SETTING,
        },
      ],
      CONNECTION_NAME.PRIMARY,
    ),

    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          imports: [],
          useFactory: () => {
            const schema = UserSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.USER,
        },
        {
          name: MasterData.name,
          imports: [],
          useFactory: () => {
            const schema = MasterDataSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.MASTER_DATA,
        },
        {
          name: Group.name,
          imports: [],
          useFactory: () => {
            const schema = GroupSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.GROUP,
        },
        {
          name: Sponsor.name,
          imports: [],
          useFactory: () => {
            const schema = SponsorSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.SPONSOR,
        },
        {
          name: Blacklist.name,
          imports: [],
          useFactory: () => {
            const schema = BlacklistSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.BLACKLIST,
        },
        {
          name: Session.name,
          imports: [],
          useFactory: () => {
            const schema = SessionSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.SESSION,
        },
        {
          name: AttributeCast.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeCastSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CAST,
        },
        {
          name: AttributeCastProfession.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeCastProfessionSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CAST_PROFESSION,
        },
        {
          name: AttributeCategory.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeHashtagSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_CATEGORY,
        },
        {
          name: AttributeHashtag.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeHashtagSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_HASHTAG,
        },
        {
          name: AttributePlatform.name,
          imports: [],
          useFactory: () => {
            const schema = AttributePlatformSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_PLATFORM,
        },
        {
          name: AttributeSponsorshipBenefit.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeSponsorshipBenefitSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
        },
        {
          name: AttributeSponsorshipForm.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeSponsorshipFormSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
        },
        {
          name: AttributeBudgetRange.name,
          imports: [],
          useFactory: () => {
            const schema = AttributeBudgetRangeSchema;
            return schema;
          },
          inject: [],
          collection: COLLECTION.ATTRIBUTE_BUDGET_RANGE,
        },
        {
          name: SponsorLog.name,
          imports: [],
          useFactory: () => SponsorLogSchema,
          inject: [],
          collection: COLLECTION.SPONSOR_LOG,
        },
        {
          name: Setting.name,
          imports: [],
          useFactory: () => SettingSchema,
          inject: [],
          collection: COLLECTION.SETTING,
        },
      ],
      CONNECTION_NAME.SECONDARY,
    ),
    HttpModule,
    MailModule,
  ],
  providers: [
    UserService,
    Cryptography,
    SponsorService,
    MasterDataService,
    GroupService,
    SettingService,
    SessionService,
    BlacklistService,
    AuthConfigStrategy,
    AttributeService,
    AttributeCastService,
    AttributeCastProfessionService,
    AttributeCategoryService,
    AttributeHashtagService,
    AttributePlatformService,
    AttributeSponsorshipBenefitService,
    AttributeSponsorshipFormService,
    AttributeBudgetRangeService,
  ],
  exports: [
    UserService,
    Cryptography,
    SponsorService,
    MasterDataService,
    GroupService,
    SettingService,
    SessionService,
    BlacklistService,
    AuthConfigStrategy,
    AttributeService,
    AttributeCastService,
    AttributeCastProfessionService,
    AttributeCategoryService,
    AttributeHashtagService,
    AttributePlatformService,
    AttributeSponsorshipBenefitService,
    AttributeSponsorshipFormService,
    AttributeBudgetRangeService,
  ],
})
export class RepositoryModule {}
