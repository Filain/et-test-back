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
        name: item?.name,
        url: item?.url,
        images: item?.images[0].url,
        date: item?.dates.start.dateTime,
        classifications: item?.classifications[0].segment.name,
        organizer: item?.promoter.name,
      }),
    );
    return mappedData;
  }
}
