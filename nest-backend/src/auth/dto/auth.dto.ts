import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

export const registerSchema = zod.object({
  name: zod.string().trim().min(1),
  email: zod.string().email(),
  password: zod.string().min(6),
});

export class RegisterDto extends createZodDto(registerSchema) {
  name!: string;
  email!: string;
  password!: string;
}

// ---------------------------------- //

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

export class LoginDto extends createZodDto(loginSchema) {
  email!: string;
  password!: string;
}
// ---------------------------------- //

export const authDtoRefreshSchema = zod.object({
  id: zod.number().int().positive(),
  name: zod.string(),
  email: zod.string().email(),
});

export class AuthDtoRefresh extends createZodDto(authDtoRefreshSchema) {
  id!: number;
  name!: string;
  email!: string;
}