import { z } from 'zod';

export const createItemSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long'),
  boardId: z
    .number()
    .int()
    .positive('Board ID must be a positive integer'),
  columnId: z
    .number()
    .int()
    .positive('Column ID must be a positive integer'),
  priorityId: z
    .number()
    .int()
    .positive('Priority ID must be a positive integer')
    .nullable(),
  assigneeId: z
    .number()
    .int()
    .positive('Assignee ID must be a positive integer')
    .nullable(),
  position: z
    .number()
    .int()
    .positive('Position must be a positive integer'),
});

export const updateItemSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title is too long')
    .optional(),
  boardId: z
    .number()
    .int()
    .positive('Board ID must be a positive integer')
    .optional(),
  columnId: z
    .number()
    .int()
    .positive('Column ID must be a positive integer')
    .optional(),
  priorityId: z   
    .number()
    .int()
    .positive('Priority ID must be a positive integer')
    .nullable()
    .optional(),
  assigneeId: z
    .number()
    .int()
    .positive('Assignee ID must be a positive integer')
    .nullable()
    .optional(),
  position: z
    .number()
    .int()
    .positive('Position must be a positive integer')
    .optional(),
});