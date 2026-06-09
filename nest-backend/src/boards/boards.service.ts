import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../Entity/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository : Repository<Board>,
  ){}

  getBoards() {
    return this.boardRepository.find();
  }
}

