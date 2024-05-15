import { EventRespounseDto } from './event.respounse.dto';

export class EventListRespounseDto {
  data: EventRespounseDto[];
  meta: {
    page: number;
    total: number;
  };
}
