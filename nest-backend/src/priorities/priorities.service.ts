import { Injectable } from "@nestjs/common";
import { PriorityRepository } from "../Repositorys/Priorities.Repository";

@Injectable()
export class PrioritiesService {
    constructor(
        private readonly priorityRepository: PriorityRepository,
    ) {}

    getPriorities() {
        return this.priorityRepository.find();
    }
}