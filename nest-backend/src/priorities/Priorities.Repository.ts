import { DataSource ,Repository } from "typeorm";
import { PriorityEntity } from "../Entity/priority.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriorityRepository extends Repository<PriorityEntity> {
    constructor(private dataSource: DataSource) {
        super(PriorityEntity, dataSource.createEntityManager());
    }
}