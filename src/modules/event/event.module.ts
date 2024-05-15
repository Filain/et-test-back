import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './event.controller';

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}