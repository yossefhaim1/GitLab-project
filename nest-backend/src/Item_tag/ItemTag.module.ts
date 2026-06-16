import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemTagController } from "./ItemTag.controller";
import { ItemTagService } from './ItamTag.service';
import { ItemTagEntity } from '../Entity/ItemTag.entity';
import { ItemTagRepository } from "../Repositorys/ItemTag.Repository";

@Module({
    imports :[
        TypeOrmModule.forFeature([ItemTagEntity])
    ],
    controllers: [ItemTagController],
    providers: [ItemTagService , ItemTagRepository]
})
export class ItemTagModule {}