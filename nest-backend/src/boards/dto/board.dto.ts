import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

export const createBoardSchema = zod.object({
  title: zod.string().trim().min(1),
  userId: zod.number().int().positive(),
});

export class CreateBoardDto extends createZodDto(createBoardSchema) {
  title!: string;
  userId!: number;
}

// ---------------------------------- //

export const updateBoardSchema = zod.object({
  title: zod.string().trim().min(1).optional(),
});

export class UpdateBoardDto extends createZodDto(updateBoardSchema) {
  title?: string;
}