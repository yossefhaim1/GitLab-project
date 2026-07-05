import {z as zod} from 'zod';
import { createZodDto } from 'nestjs-zod';


export const priorityResponseSchema = zod.object({
  id: zod.number().int().positive(),
  type: zod.string(),
  color: zod.string(),
});

export class PriorityResponseDto extends createZodDto(priorityResponseSchema) {
  id!: number;
  type!: string;
  color!: string;
}

export const priorityDeleteResponseSchema = zod.object({
  message: zod.string(),
});

export class PriorityDeleteResponseDto extends createZodDto(priorityDeleteResponseSchema) {
  message!: string;
}