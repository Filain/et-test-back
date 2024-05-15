import { Injectable } from '@nestjs/common';

import { EventRepository } from '../../repository/services/event.repository';
import { EventListRequestDto } from '../dto/request/event-list.request.dto';
import { EventMapper } from './event.mapper';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  public async findAll(query: EventListRequestDto): Promise<any> {
    const [entities, total] = await this.eventRepository.findAll(query);
    return EventMapper.toListResponseDto(entities, total, query);
  }
}
