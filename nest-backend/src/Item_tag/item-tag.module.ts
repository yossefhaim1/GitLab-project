import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemTagController } from './item-tag.controller';
import { ItemTagService } from './item-tag.service';
import { ItemTagEntity } from '../Entity/ItemTag.entity';
import { ItemTagRepository } from "./item-tag.repository";

@Module({
    imports :[
        TypeOrmModule.forFeature([ItemTagEntity])
    ],
    controllers: [ItemTagController],
    providers: [ItemTagService , ItemTagRepository]
})
export class ItemTagModule {}