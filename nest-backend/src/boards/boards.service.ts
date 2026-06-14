import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../Entity/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  getBoardDefault() {
    return this.boardRepository.findOne({
      where: { isDefault: true },
    });
  }

  getBoardById(id: number) {
    return this.boardRepository.findOne({
      where: { id },
    });
  }

  getBoards() {
    return this.boardRepository.find();
  }

  createBoard(body :{name :string ; isDefault? : boolean}){
    const NewBoard = this.boardRepository.create({
      name : body.name,
      isDefault : body.isDefault ?? false,
    });
    return this.boardRepository.save(NewBoard);
  }




}

//  הקובץ הזה אחרי על ולידציות על המידע שהמשתמש שלוח
// הקובץ הזה אחראי על הבאת הנתונים מהדאטה בייס והחזרת הנתונים ל - Controller
// וגם אחראי בין היתר על לוגיקה
// בדיקות
// ולידציות
// קריאה ל-Repository
// עבודה מול DB דרך TypeORM

// הקובץ הזה הוא מספר 3 באירככיה של הקבצים מופיע אחרי boards.controller.ts
