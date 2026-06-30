import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';
import { PriorityEntity } from './priority.entity';
import { ItemTagEntity } from './ItemTag.entity';
import { AssigneeEntity } from './assignee.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => BoardEntity, (board) => board.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board!: BoardEntity;

  @Column({ name: 'boardId' })
  boardId!: number;

  @ManyToOne(() => ColumnEntity, (column) => column.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'columnId' })
  column!: ColumnEntity;

  @Column({ name: 'columnId' })
  columnId!: number;

  @Column({ name: 'position' })
  position!: number;

  @Column({ name: 'title' })
  title!: string;

  @ManyToOne(() => AssigneeEntity, (assignee) => assignee.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'assignee' })
  assignee!: AssigneeEntity | null;

  @Column({ name: 'assignee', nullable: true })
  assigneeId!: number | null;

  @ManyToOne(() => PriorityEntity, (priority) => priority.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'priorityId'})
  priority!: PriorityEntity | null;

  @Column({ name: 'priorityId', nullable: true })
  priorityId!: number | null;

  @OneToMany(() => ItemTagEntity, (itemTag) => itemTag.item, {
    cascade: true,
  })
  tags!: ItemTagEntity[];
}
