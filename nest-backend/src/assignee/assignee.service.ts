import { Injectable, NotFoundException } from '@nestjs/common';
import { AssigneeRepository } from './assignee.Repository';
import type { CreateAssigneeDto, UpdateAssigneeDto } from './dto/assignee.dto';
import { AssigneeEntity } from '../Entity/assignee.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere.js';
import { AssigneeDeleteResponseDto, AssigneeResponseDto } from './dto/assignee-response.dto';
@Injectable()
export class AssigneesService {
    constructor(
        private readonly assigneeRepository: AssigneeRepository,
    ) {}

    async getAssignees() : Promise<AssigneeResponseDto[]> {
        return await this.assigneeRepository.find();
    }

    async getAssigneeByEntityAssignee(where: FindOptionsWhere<AssigneeEntity>) : Promise<AssigneeResponseDto | null> {
        return await this.assigneeRepository.findOne({
            where,
        });
    }

    async createAssignee(createAssigneeDto: CreateAssigneeDto) : Promise<AssigneeResponseDto> {
        const assignee = this.assigneeRepository.create(createAssigneeDto);
        return await this.assigneeRepository.save(assignee);
    }

    async updateAssignee(id: number , updateAssigneeDto: UpdateAssigneeDto) : Promise<AssigneeResponseDto | null> {
        await this.assigneeRepository.update({id}, updateAssigneeDto);
        return this.getAssigneeByEntityAssignee({id});
    }

    async deleteAssignee(id: number) :
    Promise<AssigneeDeleteResponseDto> {
        const assignee = await this.getAssigneeByEntityAssignee({id});

        if (!assignee) {
            throw new NotFoundException();
        }

        await this.assigneeRepository.delete(id);

        return {
            message: 'Assignee deleted successfully',
        };
    
    }

}
