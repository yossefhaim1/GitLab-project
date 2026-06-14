import { Entity, PrimaryGeneratedColumn , Column, OneToMany } from "typeorm";
import{ ItemEntity} from "./item.entity";
import { ColumnEntity } from "./column.entity";

@Entity('boards')
export class BoardEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    isDefault!: boolean;

    @OneToMany(() => ItemEntity, (item) => item.board)
    items!: ItemEntity[];

    @OneToMany(() => ColumnEntity, (column) => column.board)
    columns!: ColumnEntity[];


}
