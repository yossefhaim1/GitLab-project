import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from './Item.Repository';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { DeleteItemResponseDto, GetItemByIdResponseDto, ItemResponseDto } from './dto/item-response.dto';
@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getAllItems() :Promise<ItemResponseDto[]>{
    return await this.itemRepository.find({
      order: { position: 'ASC' },
    });
  }

  async getItemById(id: number): Promise<GetItemByIdResponseDto> {
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

  async getItemsByBoardId(boardId: number) :Promise<GetItemByIdResponseDto[]> {
    const items = await this.itemRepository.find({
      where: { boardId },
      order: { position: 'ASC' },
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

  async getItemsByColumnId(columnId: number) :Promise<ItemResponseDto[]> {
    return await this.itemRepository.find({
      where: { columnId },
      order: { position: 'ASC' },
    });
  }

  async createItem(createItemDto: CreateItemDto)
  : Promise<ItemResponseDto> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto)
  : Promise<GetItemByIdResponseDto> {
    const result = await this.itemRepository.update({ id }, updateItemDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.getItemById(id);
  }

  async deleteItem(id: number) :Promise<DeleteItemResponseDto>
   {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return {
      message: 'Item deleted successfully',
    };
  }

  async getRelationsItem(id: number) :Promise<GetItemByIdResponseDto> {
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
