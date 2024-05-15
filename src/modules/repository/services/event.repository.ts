import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventEntity } from '../../../database/entities/events.entity';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventEntity, dataSource.manager);
  }
}
