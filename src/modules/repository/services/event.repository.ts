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
    const eventOnPage = 12;

    if (query.sortBy.startsWith('-')) {
      query.sortBy = query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'DESC');
    } else {
      qb.addOrderBy(query.sortBy, 'ASC');
    }

    qb.take(eventOnPage);
    qb.skip(query.page * eventOnPage - eventOnPage);
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / eventOnPage);
    return [await qb.getMany(), pages];
  }
}
