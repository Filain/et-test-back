import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventEntity } from '../../../database/entities/events.entity';
import { EventListRequestDto } from '../../event/dto/request/event-list.request.dto';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventEntity, dataSource.manager);
  }
  public async findAll(
    query: EventListRequestDto,
  ): Promise<[EventEntity[], number]> {
    const qb = this.createQueryBuilder('event');
    const orderOnPage = 12;

    if (query.organizer) {
      qb.where('event.organizer LIKE :organizer', {
        organizer: `%${query.organizer}%`,
      });
    }
    if (query.title) {
      qb.where('event.title LIKE :title', { title: `%${query.title}%` });
    }
    if (query.date) {
      qb.where('event.date LIKE :date', { date: `%${query.date}%` });
    }

    qb.take(orderOnPage);
    qb.skip(query.page * orderOnPage - orderOnPage);
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / orderOnPage);
    return [await qb.getMany(), pages];
  }
}
