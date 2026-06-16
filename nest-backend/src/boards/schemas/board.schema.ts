import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long'),

  isDefault: z.boolean().optional(),
});

export const updateBoardSchema = z.object({
    id: z
    .number()
    .int('ID must be an integer'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long')
    .optional(),

  isDefault: z
    .boolean()
    .optional(),
});
