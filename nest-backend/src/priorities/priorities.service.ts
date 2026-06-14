import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PriorityEntity } from "../Entity/priority.entity";

@Injectable()
export class PrioritiesService {
    constructor(
        @InjectRepository(PriorityEntity)
        private readonly priorityRepository: Repository<PriorityEntity>,
    ) {}

    async findAll(): Promise<PriorityEntity[]> {
        return this.priorityRepository.find();
    }
}