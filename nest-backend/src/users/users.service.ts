import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './User.Repository';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from '../Entity/user.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere.js';
import { UserDeleteResponseDto, UserResponseDto } from './dto/user-response.dto';
@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getUsers() : Promise<UserResponseDto[]> {
        return await this.userRepository.find();
    }

    async getUserByEntityUser(where: FindOptionsWhere<UserEntity>) : Promise<UserResponseDto | null> {
        return await this.userRepository.findOne({
            where,
        });
    }

    async createUser(createUserDto: CreateUserDto) : Promise<UserResponseDto> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async updateUser(id: number , updateUserDto: UpdateUserDto) : Promise<UserResponseDto | null> {
        await this.userRepository.update({id}, updateUserDto);
        return this.getUserByEntityUser({id});
    }

    async deleteUser(id: number) :
    Promise<UserDeleteResponseDto> {
        const user = await this.getUserByEntityUser({id});

        if (!user) {
            throw new NotFoundException();
        }

        await this.userRepository.delete(id);

        return {
            message: 'User deleted successfully',
        };
    
    }

}
