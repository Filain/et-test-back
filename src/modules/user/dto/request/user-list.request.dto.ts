import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UserListRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  sortBy?: string = 'id';
}
