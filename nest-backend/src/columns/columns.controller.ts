import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import type { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import {
  createColumnSchema,
  updateColumnSchema,
} from './schemas/column.schema';
import {
  ColumnResponseDto,
  ColumnWithRelationsResponseDto,
  GetColumnsResponseDto,
  GetColumnsByBoardIdResponseDto,
  DeleteColumnResponseDto,
} from './dto/column-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  getColumns() : Promise<GetColumnsResponseDto>{
    return this.columnsService.getColumns();
  }
  @Get('board/:boardId')
  getColumnsByBoardId(@Param('boardId', ParseIntPipe) boardId: number)
  : Promise<GetColumnsByBoardIdResponseDto | null> {
    return this.columnsService.getColumnsByBoardId(boardId);
  }
  @Get(':id')
  getColumnById(@Param('id', ParseIntPipe) id: number)
  : Promise<ColumnWithRelationsResponseDto | null> {
    return this.columnsService.getColumnById(id);
  }

  @Post()
  createColumn(@Body() body: CreateColumnDto)
  : Promise<ColumnResponseDto> {
    const createColumnDto = createColumnSchema.parse(body);
    return this.columnsService.createColumn(createColumnDto);
  }

  @Patch('/:id')
  updateColumn(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateColumnDto,
  ): Promise<ColumnResponseDto | null> {
    const updateColumnDto = updateColumnSchema.parse(body);
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @Delete('/:id')
  deleteColumn(@Param('id', ParseIntPipe) id: number)
  : Promise<DeleteColumnResponseDto> {
    return this.columnsService.deleteColumn(id);
  }
}
