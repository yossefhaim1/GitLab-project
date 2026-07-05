import {z as zod } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const tagResponseSchema = zod.object({
  id: zod.number().int().positive(),
  title: zod.string(),
  color: zod.string(),
});

export class TagResponseDto extends createZodDto(tagResponseSchema) {
  id!: number;
  title!: string;
  color!: string;
}

export const tagDeleteResponseSchema = zod.object({
  message: zod.string(),
});

export class TagDeleteResponseDto extends createZodDto(tagDeleteResponseSchema) {
  message!: string;
}