import { Body, Controller , Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import type { CreateTagDto, UpdateTagDto } from "./dto/tag.dto";
import {CreateTagSchema } from './schemas/tag.schema'
import { UpdateTagSchema } from "./schemas/tag.schema";

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}     

    @Get()
    getTags() {
        return this.tagsService.getTags();
    }

    @Get(':id')
    getTagById(@Param('id' , ParseIntPipe) id: number) {
        return this.tagsService.getTagByEntityTag({ id });
    }

    @Post()
    createTag(@Body() body: CreateTagDto) {
      const createTagDto = CreateTagSchema.parse(body);
        return this.tagsService.createTag(createTagDto);
    }

    @Patch(':id')
    updateTag(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTagDto) {
      const updateTagDto = UpdateTagSchema.parse(body);
        return this.tagsService.updateTag(id, updateTagDto);
    }

    @Delete(':id')
    deleteTag(@Param('id', ParseIntPipe) id: number) {
        return this.tagsService.deleteTag(id);
    }
}



