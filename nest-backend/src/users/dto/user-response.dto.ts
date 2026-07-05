import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

export const userResponseSchema = zod.object({
  id: zod.number().int().positive(),
  name: zod.string(),
  email: zod.string().email(),
});

export class UserResponseDto extends createZodDto(userResponseSchema) {
  id!: number;
  name!: string;
  email!: string;
}

// ---------------------------------- //

export const getUsersResponseSchema = zod.object({
  users: zod.array(userResponseSchema),
});

export class GetUsersResponseDto extends createZodDto(getUsersResponseSchema) {
  users!: UserResponseDto[];
}

// ---------------------------------- //

export const deleteUserResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteUserResponseDto extends createZodDto(
  deleteUserResponseSchema,
) {
  message!: string;
}
// ---------------------------------- //


export const ResponsefindUserByEmailSchema = zod.object({
    id : zod.number().int().positive(),
    name: zod.string(),
    email: zod.string().email(),
    passwordHash: zod.string().min(6),
});

export class ResponseFindUserByEmailDto extends createZodDto(ResponsefindUserByEmailSchema) {
    id!: number;
    name!: string;
    email!: string;
    passwordHash!: string;
}