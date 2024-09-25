import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EventMapper } from './event.mapper';

@Injectable()
export class SchedulesService {
  constructor(private readonly httpService: HttpService) {}
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(): Promise<void> {
    Logger.log('DB update has been launched');
    const axiosResponse = await this.httpService.axiosRef.get(
      'https://app.ticketmaster.com/discovery/v2/events?page=1&size=100&apikey=xd7KQz66DHDIGA9omEjGj8ogpJhAusF9',
    );
    const currencies = await EventMapper.toResponseDto(axiosResponse);
  }
}
