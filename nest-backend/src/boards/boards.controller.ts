import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import type { CreateBoardDto, UpdateBoardDto } from "./dto/board.dto";
import {
  createBoardSchema,
  updateBoardSchema,
} from "./dto/board.dto";
import {
  BoardResponseDto,
  DeleteBoardResponseDto,
  GetAllParamsForBoardResponseDto,
  GetBoardsResponseDto,
} from "./dto/board-response.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

type RequestWithUser = {
  user: {
    id: number;
    email: string;
    name: string;
  };
};

@UseGuards(JwtAuthGuard)
@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getBoards(
    @Req() req: RequestWithUser,
  ): Promise<GetBoardsResponseDto> {
    return this.boardsService.getBoards(req.user.id);
  }

  @Get("/:id")
  getBoardById(
    @Req() req: RequestWithUser,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<BoardResponseDto | null> {
    return this.boardsService.getBoardById(id, req.user.id);
  }

  @Get("/:id/params")
  getAllParamsForBoard(
    @Req() req: RequestWithUser,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<GetAllParamsForBoardResponseDto> {
    return this.boardsService.getAllParamsForBoard(
      id,
      req.user.id,
    );
  }

  @Post()
  createBoard(
    @Req() req: RequestWithUser,
    @Body() body: CreateBoardDto,
  ): Promise<BoardResponseDto> {
    const createBoardDto = createBoardSchema.parse(body);

    return this.boardsService.createBoard(
      createBoardDto,
      req.user.id,
    );
  }

  @Patch("/:id/default")
  setDefaultBoard(
    @Req() req: RequestWithUser,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<BoardResponseDto> {
    return this.boardsService.setDefaultBoard(
      id,
      req.user.id,
    );
  }

  @Patch("/:id")
  updateBoard(
    @Req() req: RequestWithUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateBoardDto,
  ): Promise<BoardResponseDto> {
    const updateBoardDto = updateBoardSchema.parse(body);

    return this.boardsService.updateBoard(
      id,
      updateBoardDto,
      req.user.id,
    );
  }

  @Delete("/:id")
  deleteBoard(
    @Req() req: RequestWithUser,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DeleteBoardResponseDto> {
    return this.boardsService.deleteBoard(
      id,
      req.user.id,
    );
  }
}