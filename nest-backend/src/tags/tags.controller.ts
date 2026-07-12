import { Body, Controller , Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { TagsService } from "./tags.service";
import type { CreateTagDto, UpdateTagDto } from "./dto/tag.dto";
import {CreateTagSchema } from './schemas/tag.schema'
import { UpdateTagSchema } from "./schemas/tag.schema";
import { TagDeleteResponseDto, TagResponseDto } from "./dto/tag-response.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}     

    @Get()
    getTags(): Promise<TagResponseDto[]> {
        return this.tagsService.getTags();
    }

    @Get(':id')
    getTagById(@Param('id' , ParseIntPipe) id: number) : Promise<TagResponseDto | null> {
        return this.tagsService.getTagByEntityTag({ id });
    }

    @Post()
    createTag(@Body() body: CreateTagDto): Promise<TagResponseDto> {
      const createTagDto = CreateTagSchema.parse(body);
        return this.tagsService.createTag(createTagDto);
    }

    @Patch(':id')
    updateTag(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTagDto): Promise<TagResponseDto | null> {
      const updateTagDto = UpdateTagSchema.parse(body);
        return this.tagsService.updateTag(id, updateTagDto);
    }

    @Delete(':id')
    deleteTag(@Param('id', ParseIntPipe) id: number): Promise<TagDeleteResponseDto> {
        return this.tagsService.deleteTag(id);
    }
}



