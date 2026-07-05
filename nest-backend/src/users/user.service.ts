import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';
import { UserRepository } from './User.Repository';
import {
  UserResponseDto,
  GetUsersResponseDto,
  DeleteUserResponseDto,
} from './dto/user-response.dto';
import { ResponseFindUserByEmailDto } from './dto/user-response.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<GetUsersResponseDto> {
    const users = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
      },
      order: {
        id: 'ASC',
      },
    });

    return { users };
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findUserByEmailWithPassword(email: string): Promise<ResponseFindUserByEmailDto> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
      },
    });
    
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.existsBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.email) {
      const emailExists = await this.userRepository.existsBy({
        email: updateUserDto.email,
        id: Not(id),
      });

      if (emailExists) {
        throw new ConflictException('User with this email already exists');
      }
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async deleteUser(id: number): Promise<DeleteUserResponseDto> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      message: 'User deleted successfully',
    };
  }
}
