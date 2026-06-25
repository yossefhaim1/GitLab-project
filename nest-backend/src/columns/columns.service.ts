import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnRepository } from './Column.Repository';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import {
  ColumnWithRelationsResponseDto,
  GetColumnsResponseDto,
  GetColumnsByBoardIdResponseDto,
  DeleteColumnResponseDto,
  ColumnResponseDto,
} from './dto/column-response.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  async getColumnById(
    id: number,
  ): Promise<ColumnWithRelationsResponseDto | null> {
    return await this.columnRepository.findOne({
      where: { id },
      relations: {
        board: true,
        items: true,
      },
    });
  }

  async getColumns(): Promise<GetColumnsResponseDto> {
    const columns = await this.columnRepository.find({
      relations: {
        board: true,
        items: true,
      },
      order: { order: 'ASC' },
    });

    return { columns };
  }

  async getColumnsByBoardId(
    boardId: number,
  ): Promise<GetColumnsByBoardIdResponseDto | null> {
    const columns = await this.columnRepository.find({
      where: { boardId },
      order: { order: 'ASC' },
    });
    return { columns };
  }

  async createColumn(
    createColumnDto: CreateColumnDto,
  ): Promise<ColumnResponseDto> {
    const column = this.columnRepository.create(createColumnDto);

    return this.columnRepository.save(column);
  }

  async updateColumn(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnResponseDto | null> {
    await this.columnRepository.update({ id }, updateColumnDto);
    return this.getColumnById(id);
  }

  async deleteColumn(id: number): Promise<DeleteColumnResponseDto> {
    const result = await this.columnRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    return {
      message: 'Column deleted successfully',
    };
  }
}
