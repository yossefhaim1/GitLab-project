import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './user.service';
import {
  UpdateUserDto,
  updateUserSchema,
} from './dto/user.dto';
import {
  DeleteUserResponseDto,
  GetUsersResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.usersService.getUsers();
  }

  @Get('email/:email')
  async findUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findUserByEmail(email);
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updateUserDtoCreated = updateUserSchema.parse(body);

    return this.usersService.updateUser(
      id,
      updateUserDtoCreated,
    );
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteUserResponseDto> {
    return this.usersService.deleteUser(id);
  }
}