import { IsInt, IsString } from 'class-validator';

export class CreateEventRequestDto {
  @IsString()
  comment: string;

  @IsInt()
  order_id: number;
}
