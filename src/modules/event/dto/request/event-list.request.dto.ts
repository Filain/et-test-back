import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class EventListRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  date?: string;

  @IsOptional()
  @IsString()
  organizer?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  sortBy?: string = '-date';
}
