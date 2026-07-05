import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BoardEntity } from '../Entity/board.entity';

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
    constructor(private dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager());
    }

}