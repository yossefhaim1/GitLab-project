import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from '../Repositorys/Board.Repository';
import type { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getBoards() {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    return await this.boardRepository.save(
      this.boardRepository.create(createBoardDto),
    );
  }

  async deleteBoard(id: number) {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException();
    }

    await this.boardRepository.delete(id);

    return {
      message: 'Board deleted successfully',
    };
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update({ id }, updateBoardDto);
    return this.getBoardById(id);
  }

  async getAllParamsForBoard(id: number) {
    return await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        columns: {
          items: {
            priority: true,
            tags: {
              tag: true,
            },
          },
        },
      },
    });
  }
}
