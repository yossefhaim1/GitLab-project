import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    
  // מזהה ייחודי למשתמש
  @PrimaryGeneratedColumn()
  id!: number;

  // שם המשתמש
  @Column({name : 'name'})
  name!: string;
}
