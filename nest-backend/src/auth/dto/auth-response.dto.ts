import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

export const authUserResponseSchema = zod.object({
  id: zod.number().int().positive(),
  name: zod.string(),
  email: zod.string().email(),
});

export const authResponseSchema = zod.object({
  accessToken: zod.string(),
  refreshToken: zod.string(),
  user: authUserResponseSchema,
});

export class AuthResponseDto extends createZodDto(authResponseSchema) {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    id: number;
    name: string;
    email: string;
  };
}

// ---------------------------------- //


export const authRefreshResponseSchema = zod.object({
  accessToken: zod.string(),
  user: authUserResponseSchema,
});

export class AuthRefreshResponseDto extends createZodDto(
  authRefreshResponseSchema,
) {
  accessToken!: string;
  user!: {
    id: number;
    name: string;
    email: string;
  };
}

// ---------------------------------- //

export const AccessTokenResponseSchema = zod.object({
  accessToken: zod.string(),
});

export class AccessTokenResponseDto extends createZodDto(
  AccessTokenResponseSchema,
) {
  accessToken!: string;
}


export const AccessAndRefreshTokenResponseSchema = zod.object({
  accessToken: zod.string(),
  refreshToken: zod.string(),
});

export class AccessAndRefreshTokenResponseDto extends createZodDto(
  AccessAndRefreshTokenResponseSchema,
) {
  accessToken!: string
  refreshToken!: string
}