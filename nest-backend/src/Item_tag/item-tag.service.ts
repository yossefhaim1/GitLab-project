import { Injectable } from '@nestjs/common';
import { ItemTagRepository } from './item-tag.repository';
import { createItemTagDto, updateItemTagDto } from './dto/item-tag.dto';
import {
  ItemTagWithTagResponseDto,
  ItemTagsResponseDto,
  ItemTagWithItemResponseDto,
  ItemTagWithRelationsResponseDto,
  DeleteItemTagResponseDto,
} from './dto/item-tags-response.dto';
import { ItemResponseDto } from '../items/dto/item-response.dto';
import { TagResponseDto } from '../tags/dto/tag-response.dto';

@Injectable()
export class ItemTagService {
  constructor(private readonly itemTagRepository: ItemTagRepository) {}

  async getTagsByItemId(itemId: number): Promise<TagResponseDto[]> {
    const itemTags = await this.itemTagRepository.find({
      where: {
        itemId,
      },
      relations: {
        tag: true,
      },
    });

    return itemTags.map((itemTag) => itemTag.tag);
  }

  async getItemTagByItemId(itemId: number): Promise<ItemTagsResponseDto[]> {
    return this.itemTagRepository.find({
      where: { itemId },
    });
  }

  async getItemsByTagId(tagId: number): Promise<ItemResponseDto[]> {
    const itemTags = await this.itemTagRepository.find({
      where: {
        tagId,
      },
      relations: {
        item: true,
      },
    });

    return itemTags.map((itemTag) => itemTag.item);
  }

  async getAllItemTags(): Promise<ItemTagWithRelationsResponseDto[]> {
    return await this.itemTagRepository.find({
      relations: { item: true, tag: true },
    });
  }

  async getRelationsItemTags(
    id: number,
  ): Promise<ItemTagWithRelationsResponseDto | null> {
    return await this.itemTagRepository.findOne({
      where: {
        id,
      },
      relations: {
        item: true,
        tag: true,
      },
    });
  }

  async createItemTag(
    createItemTagDto: createItemTagDto,
  ): Promise<ItemTagsResponseDto> {
    const itemTag = this.itemTagRepository.create(createItemTagDto);
    return this.itemTagRepository.save(itemTag);
  }

  async updateItemTag(
    id: number,
    updateItemTagDto: updateItemTagDto,
  ): Promise<ItemTagWithRelationsResponseDto | null> {
    await this.itemTagRepository.update({ id }, updateItemTagDto);
    return this.getRelationsItemTags(id);
  }

  async deleteItemTag(id: number): Promise<DeleteItemTagResponseDto> {
    const result = await this.itemTagRepository.delete({ id });

    if (result.affected === 0) {
      throw new Error('ItemTag not found');
    }

    return {
      message: 'ItemTag deleted successfully',
    };
  }
}
