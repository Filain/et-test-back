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

export class UserListRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  // @ApiProperty({ example: EWhereHere.friends })
  // @IsOptional()
  // @IsEnum(EWhereHere)
  // where_here?: string;
  //
  // @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  // date_birth?: Date;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number = 1;

  @Type(() => String)
  @IsString()
  @IsOptional()
  sortBy?: string = 'id';
}
