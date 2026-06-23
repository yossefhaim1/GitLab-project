import { Body , Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { PrioritiesService } from "./priority.service";
import type { CreatePriorityDto, UpdatePriorityDto } from "./dto/priority.dto";
import { createPrioritySchema, updatePrioritySchema } from "./schemas/prioritiy.schema";

@Controller('priorities')
export class PrioritiesController {
    constructor(private readonly prioritiesService: PrioritiesService) {}


    @Get()
    getPriorities() {
        return this.prioritiesService.getPriorities();
    }

    @Get(':id')
    getPriorityById(@Param('id', ParseIntPipe) id: number) {
        return this.prioritiesService.getByEntityPriority({ id });
    }

    @Get('/type/:type')
    getPriorityByType(@Param('type') type: string) {
        return this.prioritiesService.getByEntityPriority({ type: type as any });
    }

    @Get('/color/:color')
    getPriorityByColor(@Param('color') color: string) {
        return this.prioritiesService.getByEntityPriority({ color });
    }

    @Post()
    createPriority(@Body() body: CreatePriorityDto) {
        const createPriorityDto = createPrioritySchema.parse(body);
        return this.prioritiesService.createPriority(createPriorityDto);
    }

    @Patch('/:id')
    updatePriority(@Param('id' , ParseIntPipe) id : number , @Body() body : UpdatePriorityDto) {
        const updatePriorityDto = updatePrioritySchema.parse(body);
        return this.prioritiesService.updatePriority(id, updatePriorityDto);
    }
    @Delete('/:id')
    deletePriority(@Param('id', ParseIntPipe) id: number) {
        return this.prioritiesService.deletePriority(id);
    }
}