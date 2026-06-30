import { Injectable } from "@nestjs/common";
import { UserRepository } from "./User.Repository";
import { email } from "zod";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(){
    const users = {
        name : "yossef",
        email : "yossef@gmail.com",
        passorwd : "123465789"
    }
    return users;
  }

}