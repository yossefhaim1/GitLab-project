import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';
import {
  columnResponseSchema,
  ColumnWithItemsResponseDto,
} from '../../columns/dto/column-response.dto';
import { itemResponseSchema } from '../../items/dto/item-response.dto';

import { priorityResponseSchema } from '../../priorities/dto/priority-response.dto';
import { tagResponseSchema } from '../../tags/dto/tag-response.dto';
import { AssigneeResponseSchema } from '../../assignee/dto/assignee-response.dto';
import { itemTagsResponseSchema } from '../../item_tag/dto/itemTags-response.dto';


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
  assignee: AssigneeResponseSchema.nullable(),
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
