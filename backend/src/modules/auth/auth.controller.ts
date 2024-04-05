import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInUserDto } from 'src/dto/user/signin-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createUser: CreateUserDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const createdUser = await this.authService.signup(createUser);

      return res.code(HttpStatus.OK).send({ createdUser });
    } catch (error) {
      if (error.status === HttpStatus.FOUND) {
        return res
          .code(HttpStatus.FOUND)
          .send({ message: 'User already exists' });
      }

      return res
        .code(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Post('signin')
  async signin(
    @Body() user: SignInUserDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const access_token = await this.authService.signin(user);

      return res.code(HttpStatus.OK).send(access_token);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res
          .code(HttpStatus.UNAUTHORIZED)
          .send({ message: error.message });
      }

      return res
        .code(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Server error' });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
