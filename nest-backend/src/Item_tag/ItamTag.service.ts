import { Injectable } from "@nestjs/common";
import { ItemTagRepository } from "../Repositorys/ItemTag.Repository";

@Injectable()
    export class ItemTagService {
        constructor(
            private readonly itemTagRepository: ItemTagRepository,
        ) {}
    
    getAllItemTags() {
        return this.itemTagRepository.find();
    }
}