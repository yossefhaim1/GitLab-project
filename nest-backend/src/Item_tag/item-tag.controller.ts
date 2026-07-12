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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemTagService } from './item-tag.service';
import type { createItemTagDto, updateItemTagDto } from './dto/item-tag.dto';
import { UpdateItemTagSchema } from './schemas/item-tag.schema';
import { CreateItemTagSchema } from './schemas/item-tag.schema';

@UseGuards(JwtAuthGuard)
@Controller('itemTags')
export class ItemTagController {
  constructor(private readonly itemTagService: ItemTagService) {}

  @Get()
  getAllItemTags() {
    return this.itemTagService.getAllItemTags();
  }

  @Get('/item/:itemId/relations')
  getItemTagRelationsByItemId(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemTagService.getItemTagByItemId(itemId);
  }

  @Get('/:id/relations')
  getRelationsItemTags(@Param('id', ParseIntPipe) id: number) {
    return this.itemTagService.getRelationsItemTags(id);
  }

  @Get('/item/:itemId')
  getItemTagsByItemId(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemTagService.getTagsByItemId(itemId);
  }

  @Get('/tag/:tagId')
  getItemTagsByTagId(@Param('tagId', ParseIntPipe) tagId: number) {
    return this.itemTagService.getItemsByTagId(tagId);
  }

  @Get('/:id')
  getItemTagById(@Param('id', ParseIntPipe) id: number) {
    return this.itemTagService.getRelationsItemTags(id);
  }

  @Post()
  createItemTag(@Body() body: createItemTagDto) {
    const createItemTagDto = CreateItemTagSchema.parse(body);
    return this.itemTagService.createItemTag(createItemTagDto);
  }

  @Patch('/:id')
  updateItemTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateItemTagDto,
  ) {
    const updateItemTagDto = UpdateItemTagSchema.parse(body);
    return this.itemTagService.updateItemTag(id, updateItemTagDto);
  }

  @Delete('/:id')
  deleteItemTag(@Param('id', ParseIntPipe) id: number) {
    return this.itemTagService.deleteItemTag(id);
  }
}
