import { PrimaryGeneratedColumn , ManyToOne , Entity, JoinColumn, Column } from "typeorm";
import { TagEntity } from "./tag.entity";
import { ItemEntity } from "./item.entity";

@Entity('itemtags')
export class ItemTagEntity{

    @PrimaryGeneratedColumn()
    id! :number ;

    @ManyToOne ( ()=> ItemEntity , (item) => item.tags, {
        onDelete:'CASCADE',
    })
    @JoinColumn({name : 'itemId'})
    item! : ItemEntity;

    @Column()
    itemId! : number;

    @ManyToOne ( ()=> TagEntity , (tag) => tag.items, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name : 'tagId'})
    tag! : TagEntity;

    @Column()
    tagId! : number;
}