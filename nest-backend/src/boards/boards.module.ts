import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from '../Entity/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],

})
export class BoardsModule {}

// הקובץ הזה הוא מספר 1 באירככיה של הקבצים מופיע אחרי app.module.ts
