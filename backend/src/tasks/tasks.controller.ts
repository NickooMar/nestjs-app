import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
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
  async find(id: string) {
    return await this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() createTask: CreateTaskDto) {
    console.log({createTask})
    // return await this.taskService.create(createTask);
  }

  @Delete(':id')
  async delete(id: string) {
    return await this.taskService.delete(id);
  }

  @Put(':id')
  async update(id: string, task: UpdateTaskDto) {
    return await this.taskService.update(id, task);
  }
}
