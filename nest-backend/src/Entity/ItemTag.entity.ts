import { PrimaryGeneratedColumn , ManyToOne , Entity, JoinColumn, Column } from "typeorm";
import { TagEntity } from "./tag.entity";
import { ItemEntity } from "./item.entity";

@Entity('item_tags')
export class ItemTagEntity{

    @PrimaryGeneratedColumn()
    id! :number ;

    @ManyToOne ( ()=> ItemEntity , (item) => item.tags)
    @JoinColumn({name : 'item_id'})
    item! : ItemEntity;

    @Column()
    item_id! : number;

    @ManyToOne ( ()=> TagEntity , (tag) => tag.items)
    @JoinColumn({name : 'tag_id'})
    tag! : TagEntity;

    @Column()
    tag_id! : number;
}