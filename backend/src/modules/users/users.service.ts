import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async findAll() {
    const select = { email: 1, username: 1, created_at: 1 };

    return await this.userModel.find({}, select);
  }

  async findOne(userId: string): Promise<User> {
    const select = { email: 1, username: 1, created_at: 1 };

    return await this.userModel.findById(userId, select);
  }

  async findOneByIdentifier(identifier: string): Promise<User | undefined> {
    const select = { email: 1, username: 1, created_at: 1 };
    const query = { $or: [{ email: identifier }, { username: identifier }] };
    return await this.userModel.findOne(query, select);
  }

  async create(createUser: CreateUserDto): Promise<User | undefined> {
    const { email, username, password, passwordConfirm } = createUser;

    const foundUser = await this.findOneByIdentifier(email);

    if (foundUser)
      throw new HttpException('user_already_exists', HttpStatus.FOUND);

    if (password !== passwordConfirm)
      throw new HttpException(
        'passwords_not_match',
        HttpStatus.EXPECTATION_FAILED,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });

    return await createdUser.save();
  }
}
