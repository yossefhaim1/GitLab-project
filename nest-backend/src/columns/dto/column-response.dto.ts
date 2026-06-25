import { createZodDto } from 'nestjs-zod';
import { z as zod } from 'zod';
import { ItemFullResponseDto, itemFullResponseSchema } from '../../items/dto/item-response.dto';
import {
  boardResponseSchema,
  BoardResponseDto,
} from '../../boards/dto/board-response.dto';

import {
  itemResponseSchema,
  ItemResponseDto,
} from '../../items/dto/item-response.dto';

// ---------------------------------- //

export const columnResponseSchema = zod.object({
  id: zod.number(),
  boardId: zod.number(),
  title: zod.string(),
  order: zod.number(),
  color: zod.string(),
});

export class ColumnResponseDto extends createZodDto(columnResponseSchema) {
    id!: number;
    boardId!: number;
    title!: string
    order!: number;
    color!: string;
}

// ---------------------------------- //

export const columnWithItemsResponseSchema = columnResponseSchema.extend({
  items: zod.array(itemFullResponseSchema),
});

export class ColumnWithItemsResponseDto extends createZodDto(
  columnWithItemsResponseSchema,
) {
  id!: number;
  boardId!: number;
  title!: string;
  order!: number;
  color!: string;
  board!: BoardResponseDto;
  items!: ItemFullResponseDto[];
}
// שייך לבורד עם הריליישן של ITEMS 
// ---------------------------------- //


export const columnWithRelationsResponseSchema = columnResponseSchema.extend({
  board: boardResponseSchema,
  items: zod.array(itemResponseSchema),
});

export class ColumnWithRelationsResponseDto extends createZodDto(
  columnWithRelationsResponseSchema,
) {
  id!: number;
  boardId!: number;
  title!: string;
  order!: number;
  color!: string;

  board!: BoardResponseDto;
  items!: ItemResponseDto[];
}
// קשור לCOLUMNS עם הבאת הבורד הספציפי וכל מערך של ITEMS ששייכים לו 
// ---------------------------------- //

export const getColumnsResponseSchema = zod.object({
  columns: zod.array(columnWithRelationsResponseSchema),
});

export class GetColumnsResponseDto extends createZodDto(
  getColumnsResponseSchema,
) {
  columns!: ColumnWithRelationsResponseDto[];
}

// ---------------------------------- //

export const getColumnsByBoardIdResponseSchema = zod.object({
  columns: zod.array(columnResponseSchema),
});

export class GetColumnsByBoardIdResponseDto extends createZodDto(
  getColumnsByBoardIdResponseSchema,
) {
  columns!: ColumnResponseDto[];
}

// ---------------------------------- //

export const deleteColumnResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteColumnResponseDto extends createZodDto(
  deleteColumnResponseSchema,
) {
  message!: string;
}