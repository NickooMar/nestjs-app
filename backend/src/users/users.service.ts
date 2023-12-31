import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { User as UserType } from 'src/types/user.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(userId: string): Promise<User>{
    const user = await this.userModel.findById(userId)
    return user
  }

  async findOneByIdentifier(identifier: string): Promise<User | undefined> {
    const query = {
      $or: [
        { _id: identifier },
        { username: identifier },
        { email: identifier },
      ],
    };

    const foundUser = await this.userModel.findOne(query);
    return foundUser;
  }

  async create(createUser: CreateUserDto): Promise<User | undefined> {
    const newUser = new this.userModel(createUser);

    return newUser

    return undefined
    // return await newUser.save();
  }
}
