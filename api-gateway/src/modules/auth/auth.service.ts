import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async login(loginDto: { username: string; password: string }) {
    try {
      const pattern = { cmd: 'login' };
      const response$ = this.authServiceClient.send(pattern, loginDto);
      const result = await lastValueFrom(response$);
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
