import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TagsService} from './tags.service';
import {TagsController} from './tags.controller';
import {TagEntity} from '../Entity/tag.entity';
import { TagRepository } from './Tag.Repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([TagEntity]),
    ],
    providers: [TagsService, TagRepository],
    controllers: [TagsController],
})
export class TagsModule {}