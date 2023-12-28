import {
  Controller,
  Get,
  Param,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const users = await this.userService.findAll();

      return res.status(HttpStatus.OK).json({
        users,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get(':identifier')
  async findOne(
    @Param('identifier') identifier: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const foundUser = await this.userService.findOneByIdentifier(identifier);

      if (!foundUser) throw new NotFoundException('User not found');

      return res.status(HttpStatus.OK).json({
        foundUser,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
