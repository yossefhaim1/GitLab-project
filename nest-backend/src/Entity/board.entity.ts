import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ItemEntity } from './item.entity';
import { ColumnEntity } from './column.entity';
import { UserEntity } from './user.entity';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'isDefault', default: false })
  isDefault!: boolean;

  @OneToMany(() => ItemEntity, (item) => item.board)
  items!: ItemEntity[];

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];

  @ManyToOne(() => UserEntity, (user) => user.boards,
   { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ name: 'userId' })
  userId!: number;
}
