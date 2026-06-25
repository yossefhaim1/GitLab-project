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
import { UserResponseDto , UserDeleteResponseDto} from './dto/user-response.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @Get('name/:name')
  getUserByName(@Param('name') name: string): Promise<UserResponseDto | null> {
    return this.usersService.getUserByEntityUser({ name });
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto | null> {
    return this.usersService.getUserByEntityUser({ id });
  }

  @Post()
  createUser(@Body() body: CreateUserDto):
  Promise<UserResponseDto> {
    const createUserDto = CreateUserSchema.parse(body);
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const updateUserDto = UpdateUserSchema.parse(body);
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number)
  : Promise<UserDeleteResponseDto> {
    return this.usersService.deleteUser(id);
  }
}
