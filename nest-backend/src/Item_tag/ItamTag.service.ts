import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemTagEntity } from '../Entity/ItemTag.entity';

@Injectable()
export class ItemTagService {
    constructor(
        @InjectRepository(ItemTagEntity)
        private readonly itemTagRepository: Repository<ItemTagEntity>,
    ) {}
    
    getAllItemTags() {
        return this.itemTagRepository.find();
    }
}