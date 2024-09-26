import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EventEntity } from '../../../database/entities/events.entity';
import { EventRepository } from '../../repository/services/event.repository';
import { EventMapper } from './event.mapper';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly eventRepository: EventRepository,
  ) {}
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(): Promise<void> {
    Logger.log('DB update has been launched');
    const axiosResponse = await this.httpService.axiosRef.get(
      'https://app.ticketmaster.com/discovery/v2/events?page=1&size=100&apikey=xd7KQz66DHDIGA9omEjGj8ogpJhAusF9',
    );
    const events = await EventMapper.toResponseDto(axiosResponse);
    for (const event of events) {
      // Перевіряємо наявність події за URL або іншим унікальним ідентифікатором
      let eventEntity = await this.eventRepository.findOne({
        where: { url: event.url },
      });

      // Якщо подія вже є, оновлюємо її
      if (eventEntity) {
        eventEntity.title = event.title;
        eventEntity.image = event.image;
        eventEntity.date = event.date;
        eventEntity.description = event.description;
        eventEntity.organizer = event.organizer;
      } else {
        // Якщо подія не існує, створюємо нову
        eventEntity = new EventEntity();
        eventEntity.title = event.title;
        eventEntity.url = event.url;
        eventEntity.image = event.image;
        eventEntity.date = event.date;
        eventEntity.description = event.description;
        eventEntity.organizer = event.organizer;
      }

      // Зберігаємо або оновлюємо подію
      await this.eventRepository.save(eventEntity);
    }
  }
}
