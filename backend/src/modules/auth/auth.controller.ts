import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInUserDto } from 'src/dto/user/signin-user.dto';
import { AuthService } from './auth.service';

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
      return res
        .code(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
