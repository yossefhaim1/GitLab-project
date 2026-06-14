import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemTagController } from "./ItemTag.controller";
import { ItemTagService } from './ItamTag.service';
import { ItemTagEntity } from '../Entity/ItemTag.entity';

@Module({
    imports :[
        TypeOrmModule.forFeature([ItemTagEntity])
    ],
    controllers: [ItemTagController],
    providers: [ItemTagService]
})
export class ItemTagModule {}