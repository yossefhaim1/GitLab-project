import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { UserRepository } from "./User.Repository";


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [UsersService, UserRepository],
    controllers: [UsersController]
})
export class UsersModule {}