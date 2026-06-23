import {
  Body,
  Post,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import type { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { createBoardSchema, updateBoardSchema } from './schemas/board.schema';
import { BoardEntity } from '../Entity/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getBoards() : Promise<BoardEntity[]> {
    return this.boardsService.getBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Get('/:id/params')
  getAllParamsForBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getAllParamsForBoard(id);
  }

  @Post()
  createBoard(@Body() body: CreateBoardDto) {
    const createBoardDto = createBoardSchema.parse(body);
    return this.boardsService.createBoard(createBoardDto);
  }
  
  @Patch(':id/default')
  setDefaultBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.setDefaultBoard(id);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBoardDto,
  ) {
    const updateBoardDto = updateBoardSchema.parse(body);
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }
}
