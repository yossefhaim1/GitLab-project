import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';

@Entity('users')
export class UserEntity {
    
  // מזהה ייחודי למשתמש
  @PrimaryGeneratedColumn()
  id!: number;
  
  // שם המשתמש
  @Column({name : 'name'})
  name!: string;

  @OneToMany(() => ItemEntity, (item) => item.assignee)
  items!: ItemEntity[];
}
