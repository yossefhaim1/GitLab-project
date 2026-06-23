import {z} from 'zod';

export const CreateUserSchema = z.object({
    name : z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name must be less than 20 characters'),
});

export const UpdateUserSchema = z.object({
    name : z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name must be less than 20 characters')
});