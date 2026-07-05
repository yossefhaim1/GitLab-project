import { DataSource , Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AssigneeEntity } from "../Entity/assignee.entity";

@Injectable()
export class AssigneeRepository extends Repository<AssigneeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AssigneeEntity, dataSource.createEntityManager());
  }
}
