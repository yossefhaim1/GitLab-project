import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers(): string[] {
        return ["yossef ", "haim ", "1569"];
    }

    getAge(): number {;
        return 25;
    }

    getUserById(id: string) {
        const users = this.getUsers();
        return users[id];
    }
}
