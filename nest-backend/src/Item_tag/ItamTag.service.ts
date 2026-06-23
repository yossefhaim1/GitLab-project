import { Injectable } from '@nestjs/common';
import { ItemTagRepository } from '../Repositorys/ItemTag.Repository';
import { ItemTagEntity } from '../Entity/ItemTag.entity';
import { createItemTagDto, updateItemTagDto } from './dto/item-tag.dto';

@Injectable()
export class ItemTagService {
  constructor(private readonly itemTagRepository: ItemTagRepository) {}

  async getTagsByItemId(itemId: number) {
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

  async getItemTagRelationsByItemId(itemId: number) {
    return this.itemTagRepository.find({
      where: { itemId },
    });
  }

  async getItemsByTagId(tagId: number) {
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

  async getAllItemTags() {
    return await this.itemTagRepository.find({
      relations: { item: true, tag: true },
    });
  }

  async getRelationsItemTags(id: number) {
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

  async createItemTag(createItemTagDto: createItemTagDto) {
    const itemTag = this.itemTagRepository.create(createItemTagDto);
    return this.itemTagRepository.save(itemTag);
  }

  async updateItemTag(id: number, updateItemTagDto: updateItemTagDto) {
    await this.itemTagRepository.update({ id }, updateItemTagDto);
    return this.getRelationsItemTags(id);
  }

  async deleteItemTag(id: number) {
    const itemTag = await this.getRelationsItemTags(id);

    if (!itemTag) {
      throw new Error('ItemTag not found');
    }

    await this.itemTagRepository.remove(itemTag);

    return {
      message: 'ItemTag deleted successfully',
    };
  }
}
