import { IsString } from 'class-validator';

export class EventsRequestDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  images: string;

  @IsString()
  date: string;

  @IsString()
  classifications: string;
}
