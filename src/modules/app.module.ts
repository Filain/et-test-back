import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { EventModule } from './event/event.module';
import { HealthModule } from './health/health.module';
import { MysqlModule } from './mysql/mysql.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MysqlModule,
    RepositoryModule,
    EventModule,
    UserModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
