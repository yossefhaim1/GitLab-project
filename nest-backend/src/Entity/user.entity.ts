import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name : 'name'})
  name!: string;

  @Column({name : 'email', unique: true })
  email!: string;

  @Column({name : 'password_hash', select: false })
  passwordHash!: string;

  @OneToMany(() => BoardEntity, (board) => board.user)
  boards!: BoardEntity[];
}
