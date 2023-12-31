import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { User as UserType } from 'src/types/user.type';
import * as bcrypt from 'bcrypt';

import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { transaction } from 'src/utils/Connection';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(userId: string): Promise<User> {
    return transaction(this.connection, async (session) => {
      return this.userModel.findById(userId).session(session);
    });
  }

  async findOneByIdentifier(identifier: string): Promise<User | undefined> {
    return transaction(this.connection, async (session) => {
      const query = {
        $or: [
          { _id: identifier },
          { username: identifier },
          { email: identifier },
        ],
      };

      return this.userModel.findOne(query).session(session);
    });
  }

  async create(createUser: CreateUserDto): Promise<User | undefined> {
    return transaction(this.connection, async (session) => {
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

      const createdUser = await this.userModel.create({
        email,
        username,
        password: hashedPassword,
      });

      



      return 
    });

    // let transactionSession = await this.connection.startSession();

    // try {
    //   transactionSession.startTransaction();
    //   const newUser = new this.userModel(createUser);

    //   return newUser;
    //   // return await newUser.save();
    // } catch (error) {
    //   await transactionSession.abortTransaction();
    //   throw error;
    // } finally {
    //   await transactionSession.endSession();
    // }
  }
}
