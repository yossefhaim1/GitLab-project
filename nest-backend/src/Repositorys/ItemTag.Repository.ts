import { DataSource , Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ItemTagEntity } from "../Entity/ItemTag.entity";

@Injectable()
export class ItemTagRepository extends Repository<ItemTagEntity>{
    constructor(private  dataSource : DataSource){
        super(ItemTagEntity, dataSource.createEntityManager());
    }
}