import { Injectable } from '@nestjs/common';
import { TagRepository } from '../Repositorys/Tag.Repository';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}

  getTags() {
    return this.tagRepository.find();
  }
}
