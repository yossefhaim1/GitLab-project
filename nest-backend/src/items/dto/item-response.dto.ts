import { z as zod } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  PriorityResponseDto,
  priorityResponseSchema,
} from '../../priorities/dto/priority-response.dto';
import {
  AssigneeResponseSchema,
  AssigneeResponseDto,
} from '../../assignee/dto/assignee-response.dto';
import {
  itemTagWithTagResponseSchema,
  ItemTagWithTagResponseDto,
} from '../../Item_tag/dto/itemTags-response.dto';
import { ColumnResponseDto, columnResponseSchema } from '../../columns/dto/column-response.dto';
import { BoardResponseDto, boardResponseSchema } from '../../boards/dto/board-response.dto';
import { TagResponseDto, tagResponseSchema } from '../../tags/dto/tag-response.dto';

export const itemResponseSchema = zod.object({
  id: zod.number().int().positive(),
  boardId: zod.number().int().positive(),
  columnId: zod.number().int().positive(),
  position: zod.number().int().nonnegative(),
  title: zod.string(),
  assigneeId: zod.number().int().positive().nullable(),
  priorityId: zod.number().int().positive().nullable(),
});

export class ItemResponseDto extends createZodDto(itemResponseSchema) {
  id!: number;
  boardId!: number;
  columnId!: number;
  position!: number;
  title!: string;
  assigneeId!: number | null;
  priorityId!: number | null;
}

// ---------------------------------- //

export const itemFullResponseSchema = itemResponseSchema.extend({
  priority: priorityResponseSchema.nullable(),
  assignee: AssigneeResponseSchema.nullable(),
  tags: zod.array(itemTagWithTagResponseSchema),
});

export class ItemFullResponseDto extends createZodDto(itemFullResponseSchema) {
  id!: number;
  title!: string;
  boardId!: number;
  columnId!: number;
  position!: number;

  priority!: PriorityResponseDto | null;
  assignee!: AssigneeResponseDto | null;
  tags!: ItemTagWithTagResponseDto[];
}
// זה ITEM עם כל ה RELATION כולל TAGS, PRIORITY, ASSIGNEE
// ---------------------------------- //
export const getItemByIdResponseSchema = itemResponseSchema.extend({
  priority: priorityResponseSchema.nullable(),
  assignee: AssigneeResponseSchema.nullable(),
  board: boardResponseSchema,
  column: columnResponseSchema,
  tags: zod.array(tagResponseSchema),
});

export class GetItemByIdResponseDto extends createZodDto(
  getItemByIdResponseSchema,
) {
  id!: number;
  title!: string;
  boardId!: number;
  columnId!: number;
  position!: number;
  assigneeId!: number | null;
  priorityId!: number | null;

  priority!: PriorityResponseDto | null;
  assignee!: AssigneeResponseDto | null;
  board!: BoardResponseDto;
  column!: ColumnResponseDto;
  tags!: TagResponseDto[];
}

// ---------------------------------- //

export const deleteItemResponseSchema = zod.object({
  message: zod.string(),
});

export class DeleteItemResponseDto extends createZodDto(
  deleteItemResponseSchema,
) {
  message!: string;
}