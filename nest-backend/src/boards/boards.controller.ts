import {Body,Post,Controller,Get,Param,Patch,ParseIntPipe,Delete,UseGuards,} from '@nestjs/common';
import { BoardsService } from './boards.service';
import type { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { createBoardSchema, updateBoardSchema } from './dto/board.dto';
import {BoardResponseDto,DeleteBoardResponseDto,GetAllParamsForBoardResponseDto,GetBoardsResponseDto,
} from './dto/board-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getBoards(): Promise<GetBoardsResponseDto> {
    return this.boardsService.getBoards();
  }

  @Get('/:id')
  getBoardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BoardResponseDto | null> {
    return this.boardsService.getBoardById(id);
  }

  @Get('/:id/params')
  getAllParamsForBoard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetAllParamsForBoardResponseDto> {
    return this.boardsService.getAllParamsForBoard(id);
  }

  @Post()
  createBoard(@Body() body: CreateBoardDto): Promise<BoardResponseDto> {
    const createBoardDto = createBoardSchema.parse(body);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id/default')
  setDefaultBoard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BoardResponseDto> {
    return this.boardsService.setDefaultBoard(id);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBoardDto,
  ): Promise<BoardResponseDto> {
    const updateBoardDto = updateBoardSchema.parse(body);
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteBoardResponseDto> {
    return this.boardsService.deleteBoard(id);
  }
}
