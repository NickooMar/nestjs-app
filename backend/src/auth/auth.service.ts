import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUser: CreateUserDto) {
    const createdUser = await this.usersService.create(createUser);

    return createdUser;
  }
}
