import { PrimaryGeneratedColumn , ManyToOne , Entity } from "typeorm";
import { TagEntity } from "./tag.entity";
import { ItemEntity } from "./item.entity";

@Entity('item_tags')
export class ItemTagEntity{

    @PrimaryGeneratedColumn()
    id! :number ;

    @ManyToOne ( ()=> ItemEntity , (item) => item.tags)
    item! : ItemEntity;

    @ManyToOne ( ()=> TagEntity , (tag) => tag.items)
    tag! : TagEntity;
}