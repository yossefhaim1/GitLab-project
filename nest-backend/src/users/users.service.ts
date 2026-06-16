import { Injectable } from '@nestjs/common';
import { UserRepository } from '../Repositorys/User.Repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    getUsers() {
        return this.userRepository.find();
    }
}
