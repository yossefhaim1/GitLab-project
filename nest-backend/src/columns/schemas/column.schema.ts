import {z} from 'zod';

export const createColumnSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long'),
  boardId: z
    .number()
    .int('Board ID must be an integer'),
  order: z
    .number()
    .int('Order must be an integer'),
  color: z
    .string()
    .min(1, 'Color is required')
    .max(20, 'Color is too long'),
});

export const updateColumnSchema = z.object({
  id: z
    .number()
    .int('ID must be an integer'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long')
    .optional(),
  order: z
    .number()
    .int('Order must be an integer')
    .optional(),
  color: z
    .string()
    .min(1, 'Color is required')
    .max(20, 'Color is too long')
    .optional(),
});