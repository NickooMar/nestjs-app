import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() response: Response ,@Body() loginDto: { username: string; password: string }) {
   try {
     const result = await this.authService.login(loginDto);
    console.log({result})
      return response.status(HttpStatus.OK).json({ data: result });
   } catch (error) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
  }
}
