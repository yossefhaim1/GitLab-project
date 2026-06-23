import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { createItemSchema, updateItemSchema } from './schemas/item.schema';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems() {
    return this.itemsService.getAllItems();
  }

  @Get('board/:boardId')
  getItemsByBoardId(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.itemsService.getItemsByBoardId(boardId);
  }

  @Get('column/:columnId')
  getItemsByColumnId(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.itemsService.getItemsByColumnId(columnId);
  }

  @Get(':id/relations')
  getRelationsItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.getRelationsItem(id);
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.getItemById(id);
  }

  @Post()
  createItem(@Body() body: CreateItemDto) {
    const createItemDto = createItemSchema.parse(body);
    return this.itemsService.createItem(createItemDto);
  }

  @Patch(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateItemDto,
  ) {
    const updateItemDto = updateItemSchema.parse(body);
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.deleteItem(id);
  }
}
