import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BoardRepository } from "./Board.Repository";
import type { CreateBoardDto, UpdateBoardDto } from "./dto/board.dto";
import {
  GetBoardsResponseDto,
  BoardResponseDto,
  DeleteBoardResponseDto,
  GetAllParamsForBoardResponseDto,
} from "./dto/board-response.dto";

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getBoards(userId: number): Promise<GetBoardsResponseDto> {
    const boards = await this.boardRepository.find({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        isDefault: true,
        userId: true,
      },
      order: {
        id: "ASC",
      },
    });

    return { boards };
  }

  async getBoardById(
    id: number,
    userId: number,
  ): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: {
        id,
        userId,
      },
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

  async createBoard(
    createBoardDto: CreateBoardDto,
    userId: number,
  ): Promise<BoardResponseDto> {
    const title = createBoardDto.title.trim();

    const boardWithSameTitleExists =
      await this.boardRepository.existsBy({
        userId,
        title,
      });

    if (boardWithSameTitleExists) {
      throw new ConflictException(
        "Board with this title already exists",
      );
    }

    const hasDefaultBoard =
      await this.boardRepository.existsBy({
        userId,
        isDefault: true,
      });

    const board = this.boardRepository.create({
      title,
      userId,
      isDefault: !hasDefaultBoard,
    });

    return this.boardRepository.save(board);
  }

  async deleteBoard(
    id: number,
    userId: number,
  ): Promise<DeleteBoardResponseDto> {
    const boardToDelete = await this.getBoardById(id, userId);

    const result = await this.boardRepository.delete({
      id,
      userId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    if (boardToDelete.isDefault) {
      const nextBoard = await this.boardRepository.findOne({
        where: {
          userId,
        },
        order: {
          id: "ASC",
        },
      });

      if (nextBoard) {
        await this.setDefaultBoard(nextBoard.id, userId);
      }
    }

    return {
      message: "Board deleted successfully",
    };
  }

  async setDefaultBoard(
    id: number,
    userId: number,
  ): Promise<BoardResponseDto> {
    const board = await this.getBoardById(id, userId);

    await this.boardRepository.update(
      {
        userId,
        isDefault: true,
      },
      {
        isDefault: false,
      },
    );

    board.isDefault = true;

    return this.boardRepository.save(board);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    userId: number,
  ): Promise<BoardResponseDto> {
    await this.getBoardById(id, userId);

    const updateData = {
      ...updateBoardDto,
      ...(updateBoardDto.title !== undefined && {
        title: updateBoardDto.title.trim(),
      }),
    };

    if (updateData.title !== undefined) {
      const boardWithSameTitleExists =
        await this.boardRepository.existsBy({
          userId,
          title: updateData.title,
        });

      const currentBoard = await this.getBoardById(id, userId);

      if (
        boardWithSameTitleExists &&
        currentBoard.title !== updateData.title
      ) {
        throw new ConflictException(
          "Board with this title already exists",
        );
      }
    }

    await this.boardRepository.update(
      {
        id,
        userId,
      },
      updateData,
    );

    return this.getBoardById(id, userId);
  }

  async getAllParamsForBoard(
    id: number,
    userId: number,
  ): Promise<GetAllParamsForBoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: {
        id,
        userId,
      },
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