import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';
import {
  columnResponseSchema,
  ColumnResponseDto,
  ColumnWithItemsResponseDto,
} from '../../columns/dto/column-response.dto';
import {
  itemResponseSchema,
  ItemResponseDto,
} from '../../items/dto/item-response.dto';

import {
  priorityResponseSchema,
  PriorityResponseDto,
} from '../../priorities/dto/priority-response.dto';
import {
  TagResponseDto,
  tagResponseSchema,
} from '../../tags/dto/tag-response.dto';
import {
  UserResponseSchema,
  UserResponseDto,
} from '../../users/dto/user-response.dto';
import {
  itemTagsResponseSchema,
  ItemTagsResponseDto,
} from '../../item_tag/dto/itemTags-response.dto';
export const boardResponseSchema = zod.object({
  id: zod.number().int().positive(),
  title: zod.string(),
  isDefault: zod.boolean(),
});

export class BoardResponseDto extends createZodDto(boardResponseSchema) {
  id!: number;
  title!: string;
  isDefault!: boolean;
}
// ---------------------------------- //

export const getBoardsResponseSchema = zod.object({
  boards: zod.array(boardResponseSchema),
});

export class GetBoardsResponseDto extends createZodDto(
  getBoardsResponseSchema,
) {
  boards!: BoardResponseDto[];
}
// ---------------------------------- //

export const deleteBoardResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteBoardResponseDto extends createZodDto(
  deleteBoardResponseSchema,
) {
  message!: string;
}

// ---------------------------------- //

export const itemTagWithTagResponseSchema = itemTagsResponseSchema.extend({
  tag: tagResponseSchema,
});

export const itemFullResponseSchema = itemResponseSchema.extend({
  priority: priorityResponseSchema.nullable(),
  assignee: UserResponseSchema.nullable(),
  tags: zod.array(itemTagWithTagResponseSchema),
});

export const columnWithItemsResponseSchema = columnResponseSchema.extend({
  items: zod.array(itemFullResponseSchema),
});

export const getAllParamsForBoardResponseSchema = boardResponseSchema.extend({
  columns: zod.array(columnWithItemsResponseSchema),
});

export class GetAllParamsForBoardResponseDto extends createZodDto(
  getAllParamsForBoardResponseSchema,
) {
  id!: number;
  title!: string;
  isDefault!: boolean;
  columns!: ColumnWithItemsResponseDto[];
}