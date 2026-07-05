import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        userId: true,
      },
    });

    return { boards };
  }
  async getBoardById(id: number): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        isDefault: true,
        userId: true,
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    const boardWithSameTitleExists = await this.boardRepository.existsBy({
      userId: createBoardDto.userId,
      title: createBoardDto.title,
    });

    if (boardWithSameTitleExists) {
      throw new ConflictException('Board with this title already exists');
    }
    const hasDefaultBoard = await this.boardRepository.existsBy({
      userId: createBoardDto.userId,
      isDefault: true,
    });
    const board = this.boardRepository.create({
      title: createBoardDto.title,
      userId: createBoardDto.userId,
      isDefault: !hasDefaultBoard,
    });

    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number): Promise<DeleteBoardResponseDto> {
    const boardToDelete = await this.getBoardById(id);

    const result = await this.boardRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

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

    return {
      message: 'Board deleted successfully',
    };
  }

  async setDefaultBoard(id: number): Promise<BoardResponseDto> {
    const board = await this.getBoardById(id);

    await this.boardRepository.update(
      {
        userId: board.userId,
        isDefault: true,
      },
      {
        isDefault: false,
      },
    );
    board.isDefault = true;

    return await this.boardRepository.save(board);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<BoardResponseDto> {
    await this.boardRepository.update({ id }, updateBoardDto);
    const board = await this.getBoardById(id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  async getAllParamsForBoard(
    id: number,
  ): Promise<GetAllParamsForBoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: {
        user: true,
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
