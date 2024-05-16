import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { EventQueryRequestDto } from './dto/request/event-query.request.dto';
import { UserListRequestDto } from './dto/request/user-list.request.dto';
import { UserResponseDto } from './dto/responce/user.response.dto';
import { UserListResponseDto } from './dto/responce/user-list.response.dto';
import { UserService } from './services/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  public async create(
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get(':id')
  public async findAll(
    @Param('id') id: string,
    @Query() query: UserListRequestDto,
  ): Promise<UserListResponseDto> {
    return await this.userService.findAll(query, id);
  }
  @ApiOperation({ summary: 'Get all users' })
  @Get('day')
  public async findAllRegistered(
    @Query() query: EventQueryRequestDto,
  ): Promise<any> {
    return await this.userService.findAllRegistered(query);
  }
}
