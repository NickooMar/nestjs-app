import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/types/user.type';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('Find all', () => {
    it('Should return an array of users', async () => {
      const result = [];
      const mockRes = { status: jest.fn(), json: jest.fn() }; // Create a mock Response

      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => result);

      await usersController.findAll(mockRes as Response); // Pass the mock Response
      expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockRes.json).toHaveBeenCalledWith({ users: result });
    });
  });
});
