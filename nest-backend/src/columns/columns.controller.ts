import { Controller, Get, Param } from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  getColumns() {
    return this.columnsService.getColumns();
  }

  @Get(':id')
  getColumnById(@Param('id') id: string) {
    return this.columnsService.getColumnsById(Number(id));
  }
}
