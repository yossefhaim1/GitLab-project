import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('users')
export class userEntity {
    
  // מזהה ייחודי למשתמש
  @PrimaryGeneratedColumn()
  id!: number;

  // שם המשתמש
  @Column()
  name!: string;
}
