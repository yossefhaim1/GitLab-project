import { Entity, PrimaryGeneratedColumn , Column, OneToMany } from "typeorm";
import{ ItemEntity} from "./item.entity";
import { ColumnEntity } from "./column.entity";

@Entity('boards')
export class BoardEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'title'})
    title!: string;

    @Column({name: 'isDefault', default: false })
    isDefault!: boolean;

    @OneToMany(() => ItemEntity, (item) => item.board)
    items!: ItemEntity[];

    @OneToMany(() => ColumnEntity, (column) => column.board)
    columns!: ColumnEntity[];

}
