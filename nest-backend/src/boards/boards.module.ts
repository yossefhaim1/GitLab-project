import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from '../Entity/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}