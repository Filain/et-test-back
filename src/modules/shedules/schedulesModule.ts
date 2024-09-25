import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SchedulesService } from './services/schedules.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
