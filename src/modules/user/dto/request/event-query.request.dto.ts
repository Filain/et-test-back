import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import { EWhereHere } from '../../enums/where-here.enum.dto';

export class EventQueryRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  event_id: number;
}
