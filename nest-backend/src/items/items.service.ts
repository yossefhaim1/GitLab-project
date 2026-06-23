import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../Repositorys/Item.Repository';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getAllItems() {
    return await this.itemRepository.find();
  }

  async getItemById(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        priority: true,
        assignee: true,
        board: true,
        column: true,
        tags: {
          tag: true,
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return {
      ...item,
      tags: item.tags.map((itemTag) => itemTag.tag),
    };
  }

  async getItemsByBoardId(boardId: number) {
    const items = await this.itemRepository.find({
      where: { boardId },
      relations: {
        priority: true,
        assignee: true,
        board: true,
        column: true,
        tags: {
          tag: true,
        },
      },
    });

    return items.map((item) => ({
      ...item,
      tags: item.tags.map((itemTag) => itemTag.tag),
    }));
  }

  async getItemsByColumnId(columnId: number) {
    return await this.itemRepository.find({
      where: { columnId },
    });
  }

  async createItem(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    const result = await this.itemRepository.update({ id }, updateItemDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.getItemById(id);
  }

  async deleteItem(id: number) {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return {
      message: 'Item deleted successfully',
    };
  }

  async getRelationsItem(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        priority: true,
        assignee: true,
        board: true,
        column: true,
        tags: {
          tag: true,
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return {
      ...item,
      tags: item.tags.map((itemTag) => itemTag.tag),
    };
  }
}
