import { AxiosResponse } from 'axios';

import { EventsResponseDto } from '../dto/responce/events.response.dto';

export class EventMapper {
  public static toResponseDto(
    eventEntity: AxiosResponse<any>,
  ): EventsResponseDto[] {
    const responseData = eventEntity.data;

    // Мапимо кожен об'єкт відповіді на об'єкт типу CurrencyResponseDto
    const mappedData: EventsResponseDto[] = responseData._embedded.events.map(
      (item: any) => ({
        title: item?.name,
        url: item?.url,
        image: item?.images[0].url,
        date: item?.dates.start.dateTime,
        description: item?.classifications[0].segment.name,
        organizer: item?.promoter.name,
      }),
    );
    return mappedData;
  }
}
