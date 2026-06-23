import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnRepository } from '../Repositorys/Column.Repository';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  async getColumnById(id: number) {
    return await this.columnRepository.findOne({
      where: { id },
      relations: {
        board: true,
        items: true,
      },
    });
  }

  async getColumns() {
    return await this.columnRepository.find({
      relations: {
        board: true,
        items: true,
      },
    });
  }
  
  async getColumnsByBoardId(boardId: number) {
  return this.columnRepository.find({
    where: { boardId },
  });
}

  async createColumn(createColumnDto: CreateColumnDto) {
    const column = this.columnRepository.create(createColumnDto);

    return this.columnRepository.save(column);
  }

  async updateColumn(id: number, updateColumnDto: UpdateColumnDto) {
    await this.columnRepository.update({ id }, updateColumnDto);
    return this.getColumnById(id);
  }

  async deleteColumn(id: number) {
    const result = await this.columnRepository.delete({ id });

    if (result.affected === 0){
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    return {
      message : 'Column deleted successfully'
    }
  }
}
