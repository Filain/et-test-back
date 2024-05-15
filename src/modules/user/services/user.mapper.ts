import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/responce/user.response.dto';
import { UserListResponseDto } from '../dto/responce/user-list.response.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      name: userEntity.name,
      email: userEntity.email,
      where_here: userEntity.where_here,
      date_birth: userEntity.date_birth,
      event_id: userEntity.event_id,
    };
  }
  public static toListResponseDto(
    entities: UserEntity[],
    total: number,
    query: UserListRequestDto,
  ): UserListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        page: query.page,
        total,
      },
    };
  }
}
