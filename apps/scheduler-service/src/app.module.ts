import { CoreModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { SponsorSchedulerController } from './modules/sponsor/sponsor-scheduler.controller';
import { JwtConfigModule } from '@app/shared/jwt/jwt-config.module';
import { RepositoryModule } from '@app/modules/repository.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SponsorSchedulerService } from './modules/sponsor/sponsor-scheduler.service';
import { CacheService } from '@app/shared/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CoreModule,
    JwtConfigModule,
    ScheduleModule.forRoot(),
    RepositoryModule,
    CacheModule.register(),
    // SponsorSchedulerModule
  ],
  controllers: [SponsorSchedulerController],
  providers: [SponsorSchedulerService, CacheService],
  exports: [SponsorSchedulerService],
})
export class AppModule {}
