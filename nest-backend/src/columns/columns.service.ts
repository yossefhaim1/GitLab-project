import { Injectable } from '@nestjs/common';
import { ColumnEntity } from '../Entity/column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  getColumnsById(id: number) {
    return this.columnRepository.findOne({
      where: { id },
    });
  }

  getColumns() {
    return this.columnRepository.find();
  }
}
