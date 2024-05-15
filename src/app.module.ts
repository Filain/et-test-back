import { Module } from '@nestjs/common';
import {HealthModule} from "./modules/health/health.module";
import {ConfigModule} from "@nestjs/config";
import configuration from './configs/config';


@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }),HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
