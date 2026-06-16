import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemEntity } from './item.entity';
import type { PriorityTypeValues } from '../../src/Type.nestJs'; ;

@Entity('priorities')
export class PriorityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name : "type"})
  type!: PriorityTypeValues; // LOW / MED / HIGH

  @Column({name : "color"})
  color!: string;

  @OneToMany(() => ItemEntity, (item) => item.priority)
  items!: ItemEntity[];
}