import { z as zod } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UserResponseSchema = zod.object({
  id: zod.number().int().positive(),
  name: zod.string(),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {
  id!: number;
  name!: string;
  
}

export const UserDeleteResponseSchema = zod.object({
  message: zod.string(),
});

export class UserDeleteResponseDto extends createZodDto(UserDeleteResponseSchema) {
  message!: string;
}