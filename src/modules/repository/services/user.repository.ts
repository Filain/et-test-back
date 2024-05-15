import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { EventQueryRequestDto } from '../../user/dto/request/event-query.request.dto';
import { UserListRequestDto } from '../../user/dto/request/user-list.request.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
  public async findAll(
    query: UserListRequestDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    const usersOnPage = 12;

    if (query.name) {
      qb.where('user.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.email) {
      qb.where('user.email LIKE :email', { email: `%${query.email}%` });
    }

    if (query.sortBy.startsWith('-')) {
      query.sortBy = query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'DESC');
    } else {
      qb.addOrderBy(query.sortBy, 'ASC');
    }

    qb.take(usersOnPage);
    qb.skip(query.page * usersOnPage - usersOnPage);
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / usersOnPage);
    return [await qb.getMany(), pages];
  }

  public async countTotalUsersByDate(
    query: EventQueryRequestDto,
  ): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Задаємо початок дня
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Задаємо початок наступного дня

    const qb = this.createQueryBuilder('user');
    // return await qb
    //   .where('user.created_at >= :start', { start: today })
    //   .andWhere('user.created_at < :end', { end: tomorrow })
    //   .andWhere('user.event_id = :event_id', { event_id: query })
    //   .getCount();
    return await qb
      .where('user.event_id = :event_id', { event_id: query.event_id })
      .andWhere('user.created_at >= :start', { start: today })
      .andWhere('user.created_at < :end', { end: tomorrow })
      .getCount();
  }
}
