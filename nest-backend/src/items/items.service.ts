import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../Repositorys/Item.Repository';

@Injectable()
export class ItemsService {
    constructor(
        private readonly itemRepository: ItemRepository,
    ) {}

    getAllItems() {
        return this.itemRepository.find();
    }
}
