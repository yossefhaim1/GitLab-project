import { Body , Controller, Get } from "@nestjs/common";
import { PrioritiesService } from "./priorities.service";

@Controller('priorities')
export class PrioritiesController {
    constructor(private readonly prioritiesService: PrioritiesService) {}


    @Get()
    getPriorities() {
        return this.prioritiesService.getPriorities();
    }
}