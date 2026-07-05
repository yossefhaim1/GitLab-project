import {z} from 'zod';

export const CreateTagSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(20, "Title must be at most 20 characters"),
    color: z
        .string()
        .min(1, "Color is required")
        .max(20, "Color must be at most 20 characters")
});

export const UpdateTagSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(20, "Title must be at most 20 characters")
        .optional(),
    color: z
        .string()
        .min(1, "Color is required")
        .max(20, "Color must be at most 20 characters")
        .optional()
});
