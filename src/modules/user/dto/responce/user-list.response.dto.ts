import { UserResponseDto } from './user.response.dto';

export class UserListResponseDto {
  data: UserResponseDto[];
  meta: {
    page: number;
    total: number;
  };
}
