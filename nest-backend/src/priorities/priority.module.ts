import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PrioritiesController } from "./priority.controller";
import { PrioritiesService } from "./priority.service";
import { PriorityEntity } from "../Entity/priority.entity";
import { PriorityRepository } from "../Repositorys/Priorities.Repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PriorityEntity])
    ],
    controllers: [PrioritiesController],
    providers: [PrioritiesService , PriorityRepository],
})
export class PrioritiesModule {}