import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boardId!: number;

  @Column()
  title!: string;

  @Column({name : 'order'})
  order!: number;

  @Column()
  color!: string;
}
