import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , OneToMany} from 'typeorm';
import { BoardEntity } from './board.entity';
import { ItemEntity } from './item.entity';

@Entity('columns')
export class ColumnEntity {
    
  // נותן לו ID ייחודי אוטומטית
  @PrimaryGeneratedColumn()
  id!: number;

  // מזהה את הלוח שאליו שייכת העמודה
  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board!: BoardEntity;

  // שם העמודה
  @Column()
  title!: string;

  // סדר העמודה בלוח
  @Column({ name: 'order' })
  order!: number;

  // צבע העמודה
  @Column()
  color!: string;

  @OneToMany(() => ItemEntity , (item) => item.column)
  items!: ItemEntity[];
}
