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
    this.boardRepository.existsBy({ isDefault: true });
    return await this.boardRepository.save(
      this.boardRepository.create(createBoardDto),
    );
  }

  async deleteBoard(id: number) {
    const boardToDelete = await this.getBoardById(id);

    if (!boardToDelete) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    await this.boardRepository.delete({ id });

    await this.boardRepository.find({ take: 1 });

    if (boardToDelete.isDefault) {
      // מנסה למצוא את הלוח הבא לפי סדר ה-id
      // לדוגמה: אם מחקנו 5 יחפש 6,7,8...
      const nextBoard =
        (await this.boardRepository
          .createQueryBuilder('board')
          .where('board.id > :id', { id })
          .orderBy('board.id', 'ASC')
          .getOne()) ||
        (await this.boardRepository
          .createQueryBuilder('board')
          .orderBy('board.id', 'ASC')
          .getOne());

      if (nextBoard) {
        await this.setDefaultBoard(nextBoard.id);
      }
    }

    return {
      message: 'Board deleted successfully',
    };
  }

  async setDefaultBoard(id: number) {
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

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update({ id }, updateBoardDto);
    return this.getBoardById(id);
  }

  async getAllParamsForBoard(id: number) {
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
