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

import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto, createUserSchema, updateUserSchema } from './dto/user.dto';
import { ResponseFindUserByEmailDto } from './dto/user-response.dto';
import {
  DeleteUserResponseDto,
  GetUsersResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  @Get('emailPassword/:email')
  async findUserByEmailWithPassword(
    @Param('email') email: string,
  ): Promise<ResponseFindUserByEmailDto> {
    return this.usersService.findUserByEmailWithPassword(email);
  }
  @Get('email/:email')
  async findUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findUserByEmail(email);
  }

  @Post()
  async createUser(
    @Body() body: CreateUserDto,
  ): Promise<UserResponseDto> {
    const createUserDtoCreated = createUserSchema.parse(body);
    return this.usersService.createUser(createUserDtoCreated);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updateUserDtoCreated = updateUserSchema.parse(body);
    return this.usersService.updateUser(id, updateUserDtoCreated);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteUserResponseDto> {
    return this.usersService.deleteUser(id);
  }
}
