import { EventEntity } from '../../../database/entities/events.entity';
import { EventListRequestDto } from '../dto/request/event-list.request.dto';
import { EventRespounseDto } from '../dto/responce/event.respounse.dto';
import { EventListRespounseDto } from '../dto/responce/event-list.respounse.dto';

export class EventMapper {
  public static toResponseDto(eventEntity: EventEntity): EventRespounseDto {
    return {
      id: eventEntity.id,
      created_at: eventEntity.created_at,
      title: eventEntity.title,
      description: eventEntity.description,
      organizer: eventEntity.organizer,
      date: eventEntity.date,
    };
  }
  public static toListResponseDto(
    entities: EventEntity[],
    total: number,
    query: EventListRequestDto,
  ): EventListRespounseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        page: query.page,
        total,
      },
    };
  }
}
