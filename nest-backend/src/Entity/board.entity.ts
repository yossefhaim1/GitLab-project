import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'isDefault', default: false })
  isDefault!: boolean;
}