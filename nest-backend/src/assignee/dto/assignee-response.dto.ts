import { z as zod } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const AssigneeResponseSchema = zod.object({
  id: zod.number().int().positive(),
  name: zod.string(),
});

export class AssigneeResponseDto extends createZodDto(AssigneeResponseSchema) {
  id!: number;
  name!: string;
  
}

export const AssigneeDeleteResponseSchema = zod.object({
  message: zod.string(),
});

export class AssigneeDeleteResponseDto extends createZodDto(AssigneeDeleteResponseSchema) {
  message!: string;
}