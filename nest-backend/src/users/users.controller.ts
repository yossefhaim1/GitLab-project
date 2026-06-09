import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    const age = this.usersService.getAge();
    const users = this.usersService.getUsers();
    return { users, age };
  }  

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);
    return { user };
  }
}
