import { IsString } from 'class-validator';

export class EventsResponseDto {
  title: string;

  description: string;

  url: string;

  images: string;

  date: string;

  organizer: string;
}
