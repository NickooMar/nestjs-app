import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Injectable,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createUser: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const createdUser = await this.authService.signup(createUser);

      return res.status(HttpStatus.OK).json({ createdUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
