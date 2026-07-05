import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';

import { columnResponseSchema } from '../../columns/dto/column-response.dto';
import { itemResponseSchema } from '../../items/dto/item-response.dto';
import { priorityResponseSchema } from '../../priorities/dto/priority-response.dto';
import { tagResponseSchema } from '../../tags/dto/tag-response.dto';
import { AssigneeResponseSchema } from '../../assignee/dto/assignee-response.dto';
import { itemTagsResponseSchema } from '../../Item_tag/dto/itemTags-response.dto';
import { userResponseSchema, UserResponseDto } from '../../users/dto/user-response.dto';

// ---------------------------------- //
// Basic Board Response

export const boardResponseSchema = zod.object({
  id: zod.number().int().positive(),
  title: zod.string(),
  isDefault: zod.boolean(),
  userId: zod.number().int().positive(),
});

export class BoardResponseDto extends createZodDto(boardResponseSchema) {
  id!: number;
  title!: string;
  isDefault!: boolean;
  userId!: number;
}

// ---------------------------------- //
// Get Boards Response

export const getBoardsResponseSchema = zod.object({
  boards: zod.array(boardResponseSchema),
});

export class GetBoardsResponseDto extends createZodDto(
  getBoardsResponseSchema,
) {
  boards!: BoardResponseDto[];
}

// ---------------------------------- //
// Delete Board Response

export const deleteBoardResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteBoardResponseDto extends createZodDto(
  deleteBoardResponseSchema,
) {
  message!: string;
}

// ---------------------------------- //
// Item Tag + Tag

export const itemTagWithTagResponseSchema = itemTagsResponseSchema.extend({
  tag: tagResponseSchema,
});

export class ItemTagWithTagResponseDto extends createZodDto(
  itemTagWithTagResponseSchema,
) {}

// ---------------------------------- //
// Full Item Response

export const itemFullResponseSchema = itemResponseSchema.extend({
  priority: priorityResponseSchema.nullable(),
  assignee: AssigneeResponseSchema.nullable(),
  tags: zod.array(itemTagWithTagResponseSchema),
});

export class ItemFullResponseDto extends createZodDto(itemFullResponseSchema) {}

// ---------------------------------- //
// Column With Full Items

export const columnWithItemsResponseSchema = columnResponseSchema.extend({
  items: zod.array(itemFullResponseSchema),
});

export class ColumnWithFullItemsResponseDto extends createZodDto(
  columnWithItemsResponseSchema,
) {}

// ---------------------------------- //
// Full Board Response

export const getAllParamsForBoardResponseSchema = boardResponseSchema.extend({
  user: userResponseSchema,
  columns: zod.array(columnWithItemsResponseSchema),
});

export class GetAllParamsForBoardResponseDto extends createZodDto(
  getAllParamsForBoardResponseSchema,
) {
  id!: number;
  title!: string;
  isDefault!: boolean;
  userId!: number;
  user!: UserResponseDto;
  columns!: ColumnWithFullItemsResponseDto[];
}