import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';
import { EventQueryRequestDto } from '../dto/request/event-query.request.dto';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/responce/user.response.dto';
import { UserListResponseDto } from '../dto/responce/user-list.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async create(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const userEvent = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (userEvent && dto.event_id === userEvent.event_id) {
      throw new ConflictException('User already registered on the event');
    }

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto }),
    );
    return UserMapper.toResponseDto(user);
  }

  public async findAll(
    query: UserListRequestDto,
    id: string,
  ): Promise<UserListResponseDto> {
    const [entities, total] = await this.userRepository.findAll(query, id);
    return UserMapper.toListResponseDto(entities, total, query);
  }
  public async findAllRegistered(query: EventQueryRequestDto): Promise<number> {
    return await this.userRepository.countTotalUsersByDate(query);
  }
}
