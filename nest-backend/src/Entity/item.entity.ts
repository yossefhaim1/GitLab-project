import {Entity, Column , PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';
import { PriorityEntity } from './priority.entity';
import { ItemTagEntity } from './ItemTag.entity';


@Entity('items')
export class ItemEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => BoardEntity, (board) => board.items)
    board! : BoardEntity;

    @ManyToOne(() => ColumnEntity, (column) => column.items)
    column! : ColumnEntity;

    @Column()
    position!: number;

    @Column()
    title!: string;

    @Column()
    assignee!: string;

    @ManyToOne(() => PriorityEntity , (priority) => priority.items)
    priority!: PriorityEntity;

    @OneToMany (() => ItemTagEntity , (itemTag) => itemTag.item)
    tags!: ItemTagEntity[];

}
