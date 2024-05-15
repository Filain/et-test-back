import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

import { EWhereHere } from '../../enums/where-here.enum.dto';

export class CreateUserRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string;

  @ApiProperty({ example: EWhereHere.friends })
  @IsNotEmpty()
  @IsEnum(EWhereHere)
  where_here?: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date_birth must be in the format YYYY-MM-DD',
  })
  date_birth?: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  event_id: number;
}
