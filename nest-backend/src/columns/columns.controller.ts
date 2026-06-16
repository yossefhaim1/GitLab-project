import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import type { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import {
  createColumnSchema,
  updateColumnSchema,
} from './schemas/column.schema';
import { id } from 'zod/v4/locales';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  getColumns() {
    return this.columnsService.getColumns();
  }

  @Get(':id')
  getColumnById(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.getColumnById(id);
  }

  @Post()
  createColumn(@Body() body: CreateColumnDto) {
    const createColumnDto = createColumnSchema.parse(body);
    return this.columnsService.createColumn(createColumnDto);
  }

  @Patch('/:id')
  updateColumn(@Param('id', ParseIntPipe) id: number,@Body() body: UpdateColumnDto,) {
    const updateColumnDto = updateColumnSchema.parse(body);
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @Delete('/:id')
  deleteColumn(@Param('id', ParseIntPipe) id: number ){
    return this.columnsService.deleteColumn(id);
  }
}
