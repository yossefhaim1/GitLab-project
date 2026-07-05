import { Injectable, NotFoundException } from '@nestjs/common';
import { PriorityRepository } from './Priorities.Repository';
import { PriorityTypeValues } from '../Type.nestJs';
import { CreatePriorityDto, UpdatePriorityDto } from './dto/priority.dto';
import { PriorityEntity } from '../Entity/priority.entity';
import { FindOptionsWhere } from 'typeorm';
import { PriorityDeleteResponseDto, PriorityResponseDto } from './dto/priority-response.dto';

@Injectable()
export class PrioritiesService {
  constructor(private readonly priorityRepository: PriorityRepository) {}

  async getPriorities() :Promise<PriorityResponseDto[]> {
    return await this.priorityRepository.find();
  }

  async getByEntityPriority(where : FindOptionsWhere<PriorityEntity>) :Promise<PriorityResponseDto | null> {
    return await this.priorityRepository.findOne({
      where,
    });

  }

  async createPriority(createPriorityDto: CreatePriorityDto) :Promise<PriorityResponseDto> {
    const priority = this.priorityRepository.create(createPriorityDto);
    return this.priorityRepository.save(priority);
  }

  async updatePriority(id: number, updatePriorityDto: UpdatePriorityDto) :Promise<PriorityResponseDto | null> {
    await this.priorityRepository.update({ id }, updatePriorityDto);
    return this.getByEntityPriority({ id });
  }

  async deletePriority(id: number)
  : Promise<PriorityDeleteResponseDto> {
    const priority = await this.getByEntityPriority({ id });

    if (!priority) {
      throw new NotFoundException();
    }

    await this.priorityRepository.delete(id);

    return {
      message: 'Priority deleted successfully',
    };
  }
}
