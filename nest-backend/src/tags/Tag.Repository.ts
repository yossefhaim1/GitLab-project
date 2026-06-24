import {Injectable} from '@nestjs/common';
import {TagEntity} from '../Entity/tag.entity';
import {DataSource, Repository} from 'typeorm';    
@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private dataSource: DataSource) {
    super(TagEntity, dataSource.createEntityManager());
  }
}