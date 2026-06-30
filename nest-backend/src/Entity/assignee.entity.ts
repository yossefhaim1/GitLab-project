import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ItemEntity } from './item.entity';
import { BoardEntity } from './board.entity';

@Entity('assignee')
export class AssigneeEntity {
    
  // מזהה ייחודי למשתמש
  @PrimaryGeneratedColumn()
  id!: number;
  
  // שם המשתמש
  @Column({name : 'name'})
  name!: string;

  @OneToMany(() => ItemEntity, (item) => item.assignee)
  items!: ItemEntity[];
}
