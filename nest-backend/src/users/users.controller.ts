import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './dto/user.dto';
import type { UpdateUserDto } from './dto/user.dto';
import { CreateUserSchema, UpdateUserSchema } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('name/:name')
  getUserByName(@Param('name') name: string) {
    return this.usersService.getUserByEntityUser({ name });
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserByEntityUser({ id });
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    const createUserDto = CreateUserSchema.parse(body);
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const updateUserDto = UpdateUserSchema.parse(body);
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
