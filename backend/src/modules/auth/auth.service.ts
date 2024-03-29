import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInUserDto } from 'src/dto/user/signin-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUser: CreateUserDto) {
    const createdUser = await this.usersService.create(createUser);

    return createdUser;
  }

  async signin(signinUser: SignInUserDto): Promise<{ access_token: string }> {
    try {
      const foundUser: User = await this.usersService.findOneSingingIn(
        signinUser.email,
      );

      if (!foundUser) throw new UnauthorizedException('Invalid credentials');

      const isMatch = await bcrypt.compare(
        signinUser.password,
        foundUser.password,
      );

      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const payload = { sub: foundUser._id, username: foundUser.username };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // Invalid credentials
      if (error instanceof UnauthorizedException) throw error;

      // Server error
      throw new InternalServerErrorException();
    }
  }
}
