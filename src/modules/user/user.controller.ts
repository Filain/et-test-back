import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { UserListRequestDto } from './dto/request/user-list.request.dto';
import { UserListResponseDto } from './dto/responce/user-list.response.dto';
import { UserService } from './services/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  public async create(@Body() dto: CreateUserRequestDto) {
    return await this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Get users who have registered on the event ' })
  @Get(':id')
  public async findAll(
    @Param('id') id: string,
    @Query() query: UserListRequestDto,
  ): Promise<UserListResponseDto> {
    return await this.userService.findAll(query, id);
  }
  @ApiOperation({ summary: 'Users who have registered on the event today' })
  @Get('day/:id')
  public async findAllRegistered(@Param('id') id: string): Promise<any> {
    return await this.userService.findAllRegistered(id);
  }
}
