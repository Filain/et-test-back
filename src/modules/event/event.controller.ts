import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EventListRequestDto } from './dto/request/event-list.request.dto';
import { EventListRespounseDto } from './dto/responce/event-list.respounse.dto';
import { EventService } from './services/event.service';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Get all events' })
  @Get()
  public async findAll(
    @Query() query: EventListRequestDto,
  ): Promise<EventListRespounseDto> {
    return await this.eventService.findAll(query);
  }
}
