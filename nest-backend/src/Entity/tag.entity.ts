import { Entity, PrimaryGeneratedColumn, Column, OneToMany,  } from "typeorm";
import { ItemTagEntity } from "./ItemTag.entity";


@Entity('tags')
export class TagEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name : 'title'})
    title!: string;

    @Column({name : 'color'})
    color!: string;

    @OneToMany(()=> ItemTagEntity , (itemTag) => itemTag.tag)
    items! : ItemTagEntity[];


}