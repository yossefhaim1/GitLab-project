import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

export const createUserSchema = zod.object({
  name: zod.string().trim().min(1),
  email: zod.string().email(),
  password: zod.string().min(6),
});

export class CreateUserDto extends createZodDto(createUserSchema) {
  name!: string;
  email!: string;
  password!: string;
}

// ---------------------------------- //

export const updateUserSchema = zod.object({
  name: zod.string().trim().min(1).optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(6).optional(),
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {
  name?: string;
  email?: string;
  password?: string;
}

