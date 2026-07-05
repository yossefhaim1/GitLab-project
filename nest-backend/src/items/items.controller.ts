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
import { DeleteItemResponseDto, GetItemByIdResponseDto, ItemResponseDto } from './dto/item-response.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems(): Promise<ItemResponseDto[]> {
    return this.itemsService.getAllItems();
  }

  @Get('board/:boardId')
  getItemsByBoardId(@Param('boardId', ParseIntPipe) boardId: number)
  : Promise<GetItemByIdResponseDto[]> {
    return this.itemsService.getItemsByBoardId(boardId);
  }

  @Get('column/:columnId')
  getItemsByColumnId(@Param('columnId', ParseIntPipe) columnId: number)
   : Promise<ItemResponseDto[]> {
    return this.itemsService.getItemsByColumnId(columnId);
  }

  @Get(':id/relations')
  getRelationsItem(@Param('id', ParseIntPipe) id: number)
   : Promise<GetItemByIdResponseDto> {
    return this.itemsService.getRelationsItem(id);
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number)
   : Promise<GetItemByIdResponseDto> {
    return this.itemsService.getItemById(id);
  }

  @Post()
  createItem(@Body() body: CreateItemDto)
  : Promise<ItemResponseDto> {
    const createItemDto = createItemSchema.parse(body);
    return this.itemsService.createItem(createItemDto);
  }

  @Patch(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateItemDto,
  ): Promise<GetItemByIdResponseDto> {
    const updateItemDto = updateItemSchema.parse(body);
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number) 
  : Promise<DeleteItemResponseDto> {
    return this.itemsService.deleteItem(id);
  }
}
