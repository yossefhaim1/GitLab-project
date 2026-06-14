import { Body, Post ,Controller, Get, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('default')
  getBoardDefault() {
    return this.boardsService.getBoardDefault();
  }

  @Get(':id')
  getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(Number(id));
  }

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Post()
  createBoard(@Body() body : {name: string; isDefault? :boolean}){
    return this.boardsService.createBoard(body)
  }







}


// לקובץ הזה מגיע הבקשה של המשתמש ויודעים לזהת לפי ההוספה של 'boards' ויודעים לזהות לפי המשך הPATH  איזה בקשה בוקשה
// אני לא יודע להביא נתונים אני מעביר את העבודה ל - Service
// הקובץ הזה הקובץ מסםר 2 באירככיה של הקבצים מופיע אחרי boards.module.ts הקובץ הבא שיבוא הוא boards.service.ts
