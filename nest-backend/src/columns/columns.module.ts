import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from '../Entity/column.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ColumnRepository } from '../Repositorys/Column.Repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnsService, ColumnRepository],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
