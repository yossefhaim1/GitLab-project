import { z } from 'zod';
import { PriorityType } from '../../Type.nestJs';

export const createPrioritySchema = z.object({
  type: z.enum([PriorityType.LOW, PriorityType.MEDIUM, PriorityType.HIGH , PriorityType.URGENT, PriorityType.CRITICAL]),
  color: z
    .string()
    .min(1, { message: 'Color is required' })
    .max(7, { message: 'Color must be less than 7 characters' }),
});

export const updatePrioritySchema = z.object({
  type: z
    .enum([PriorityType.LOW, PriorityType.MEDIUM, PriorityType.HIGH , PriorityType.URGENT, PriorityType.CRITICAL])
    .optional(),
  color: z
    .string()
    .min(1, { message: 'Color is required' })
    .max(7, { message: 'Color must be less than 7 characters' })
    .optional(),
});
