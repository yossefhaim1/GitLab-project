import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../Entity/item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>,
    ) {}

    getAllItems() {
        return this.itemRepository.find();
    }
}
