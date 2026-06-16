import {Entity, Column , PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';
import { PriorityEntity } from './priority.entity';
import { ItemTagEntity } from './ItemTag.entity';


@Entity('items')
export class ItemEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => BoardEntity, (board) => board.items)
    @JoinColumn({ name: 'boardId' })
    board! : BoardEntity;

    @Column({name : 'boardId'})
    boardId!: number;
    
    @ManyToOne(() => ColumnEntity, (column) => column.items)
    @JoinColumn({ name: 'columnId' })
    column! : ColumnEntity;

    @Column({name : 'columnId'})
    columnId!: number;

    @Column({name : 'position'})
    position!: number;

    @Column({name : 'title'})
    title!: string;

    @Column({name : 'assignee'})
    assignee!: string;

    @ManyToOne(() => PriorityEntity , (priority) => priority.items)
    @JoinColumn({ name: 'priorityId' })
    priority!: PriorityEntity;

    @Column({name : 'priorityId'})
    priorityId!: number;

    @OneToMany (() => ItemTagEntity , (itemTag) => itemTag.item)
    tags!: ItemTagEntity[];

}
