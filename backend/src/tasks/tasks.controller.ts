import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const taskFound = await this.taskService.findOne(id);

    if (!taskFound) throw new NotFoundException('Task not found');

    return taskFound;
  }

  @Post()
  async create(@Body() createTask: CreateTaskDto) {
    try {
      return await this.taskService.create(createTask);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const deletedTask = await this.taskService.delete(id);

    if (!deletedTask) throw new NotFoundException('Task not found');

    return deletedTask;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    const updatedTask = await this.taskService.update(id, task);

    if (!updatedTask) throw new NotFoundException('Task not found');

    return updatedTask;
  }
}
