import {
  Controller,
  Get,
  Param,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FastifyReply } from 'fastify';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const users = await this.userService.findAll();

      return res.code(HttpStatus.OK).send({ users });
    } catch (error) {
      return res.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message,
      });
    }
  }

  @Get(':identifier')
  async findOne(
    @Param('identifier') identifier: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const foundUser = await this.userService.findOneByIdentifier(identifier);

      if (!foundUser) throw new NotFoundException('User not found');

      return res.code(HttpStatus.OK).send({
        foundUser,
      });
    } catch (error) {
      return res.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message,
      });
    }
  }
}
