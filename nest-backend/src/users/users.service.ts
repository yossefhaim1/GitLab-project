import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../Repositorys/User.Repository';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from '../Entity/user.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere.js';
@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUserByEntityUser(where: FindOptionsWhere<UserEntity>) {
        return await this.userRepository.findOne({
            where,
        });
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async updateUser(id: number , updateUserDto: UpdateUserDto) {
        await this.userRepository.update({id}, updateUserDto);
        return this.getUserByEntityUser({id});
    }

    async deleteUser(id: number) {
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
