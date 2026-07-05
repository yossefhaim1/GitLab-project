import { z as zod } from 'zod';
import { createZodDto } from 'nestjs-zod';

import {
  TagResponseDto,
  tagResponseSchema,
} from '../../tags/dto/tag-response.dto';

import {
  ItemResponseDto,
  itemResponseSchema,
} from '../../items/dto/item-response.dto';

export const itemTagsResponseSchema = zod.object({
  id: zod.number().int().positive(),
  itemId: zod.number().int().positive(),
  tagId: zod.number().int().positive(),
});

export class ItemTagsResponseDto extends createZodDto(itemTagsResponseSchema) {
  id!: number;
  itemId!: number;
  tagId!: number;
}

// ---------------------------------- //

export const itemTagWithTagResponseSchema = itemTagsResponseSchema.extend({
  tag: tagResponseSchema,
});

export class ItemTagWithTagResponseDto extends createZodDto(
  itemTagWithTagResponseSchema,
) {
  id!: number;
  itemId!: number;
  tagId!: number;
  tag!: TagResponseDto;
}

// ---------------------------------- //

export const itemTagWithItemResponseSchema = itemTagsResponseSchema.extend({
  item: itemResponseSchema,
});

export class ItemTagWithItemResponseDto extends createZodDto(
  itemTagWithItemResponseSchema,
) {
  id!: number;
  itemId!: number;
  tagId!: number;
  item!: ItemResponseDto;
}

// ---------------------------------- //

export const itemTagWithRelationsResponseSchema = itemTagsResponseSchema.extend({
  item: itemResponseSchema,
  tag: tagResponseSchema,
});

export class ItemTagWithRelationsResponseDto extends createZodDto(
  itemTagWithRelationsResponseSchema,
) {
  id!: number;
  itemId!: number;
  tagId!: number;
  item!: ItemResponseDto;
  tag!: TagResponseDto;
}

// ---------------------------------- //

export const deleteItemTagResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteItemTagResponseDto extends createZodDto(
  deleteItemTagResponseSchema,
) {
  message!: string;
}