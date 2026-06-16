import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , OneToMany, JoinColumn} from 'typeorm';
import { BoardEntity } from './board.entity';
import { ItemEntity } from './item.entity';

@Entity('columns')
export class ColumnEntity {
    
  // נותן לו ID ייחודי אוטומטית
  @PrimaryGeneratedColumn()
  id!: number;

  // מזהה את הלוח שאליו שייכת העמודה
  @ManyToOne(() => BoardEntity, (board) => board.columns)
  @JoinColumn({ name: 'boardId' })
  board!: BoardEntity;

  @Column({name : 'boardId'})
  boardId!: number;

  // שם העמודה
  @Column({name : 'title'})
  title!: string;

  // סדר העמודה בלוח
  @Column({ name: 'order' })
  order!: number;

  // צבע העמודה
  @Column({name : 'color'})
  color!: string;

  @OneToMany(() => ItemEntity , (item) => item.column)
  items!: ItemEntity[];
}
