import {z} from 'zod';

export const CreateItemTagSchema = z.object({
    itemId: z.number().int().positive(),
    tagId: z.number().int().positive(),
});

export const UpdateItemTagSchema = z.object({
    itemId: z.number().int().positive(),
    tagId: z.number().int().positive(),
});