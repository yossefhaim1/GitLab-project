import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PrioritiesController } from "./priorities.controller";
import { PrioritiesService } from "./priorities.service";
import { PriorityEntity } from "../Entity/priority.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PriorityEntity])
    ],
    controllers: [PrioritiesController],
    providers: [PrioritiesService],
})
export class PrioritiesModule {}