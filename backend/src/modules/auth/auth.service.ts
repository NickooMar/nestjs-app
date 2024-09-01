import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { SignInUserDto } from 'src/modules/users/dto/signin-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { User as UserType } from 'src/modules/users/types/user.type';

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

  async profile(access_token: string): Promise<UserType> {
    try {
      console.log({ access_token });

      return { _id: '1', email: '', username: '' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
