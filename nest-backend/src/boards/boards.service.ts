import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './Board.Repository';
import type { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import {
  GetBoardsResponseDto,
  BoardResponseDto,
  DeleteBoardResponseDto,
  GetAllParamsForBoardResponseDto,
} from './dto/board-response.dto';
@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getBoards(): Promise<GetBoardsResponseDto> {
    const boards = await this.boardRepository.find({
      select: {
        id: true,
        title: true,
        isDefault: true,
      },
    });

    return { boards };
  }
  async getBoardById(id: number): Promise<BoardResponseDto | null> {
    return await this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    this.boardRepository.existsBy({ isDefault: true });
    return await this.boardRepository.save(
      this.boardRepository.create(createBoardDto),
    );
  }

  async deleteBoard(id: number): Promise<DeleteBoardResponseDto> {
  const boardToDelete = await this.getBoardById(id);

  if (boardToDelete?.isDefault) {
    const anyBoard = await this.boardRepository.findOne({
      where: {},
      order: {
        id: 'ASC',
      },
    });

    if (anyBoard) {
      await this.setDefaultBoard(anyBoard.id);
    }
  }
  
  await this.boardRepository.delete({ id });
  return {
    message: 'Board deleted successfully',
  };
}

  async setDefaultBoard(id: number): Promise<BoardResponseDto> {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    await this.boardRepository.update(
      { isDefault: true },
      { isDefault: false },
    );

    board.isDefault = true;

    return await this.boardRepository.save(board);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<BoardResponseDto | null> {
    await this.boardRepository.update({ id }, updateBoardDto);
    return this.getBoardById(id);
  }

  async getAllParamsForBoard(id: number): Promise<GetAllParamsForBoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: {
        columns: {
          items: {
            priority: true,
            assignee: true,
            tags: {
              tag: true,
            },
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }
}
