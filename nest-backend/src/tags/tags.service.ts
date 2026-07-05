import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from './Tag.Repository';
import { TagEntity } from '../Entity/tag.entity';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere.js';
import { TagDeleteResponseDto, TagResponseDto } from './dto/tag-response.dto';
@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTags(): Promise<TagResponseDto[]> {
    return await this.tagRepository.find();
  }

  async getTagByEntityTag(where: FindOptionsWhere<TagEntity>): Promise<TagResponseDto | null> {
    return await this.tagRepository.findOne({
      where,
    });
  }

  async createTag(createTagDto: CreateTagDto): Promise<TagResponseDto> {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async updateTag(id: number, updateTagDto: UpdateTagDto): Promise<TagResponseDto | null> {
    await this.tagRepository.update({ id }, updateTagDto);
    return await this.getTagByEntityTag({ id });
  }

  async deleteTag(id: number) :
  Promise<TagDeleteResponseDto> {
    const tag = await this.getTagByEntityTag({ id });

    if (!tag) {
      throw new NotFoundException();
    }
    await this.tagRepository.delete({ id });
    return {
      message: 'Tag deleted successfully',
    };
  }
}
