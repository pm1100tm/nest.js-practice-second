import { Board } from '../model/board.interface';
import { BoardStatus } from '../model/board.interface';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardService } from '../service/board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatusValidation } from '../pipes/board-status-validation.pipe';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoard(): Board[] {
    console.log('==getAllBoard');
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return null;
  }

  // @Get(':id')
  // getOneBoard(@Param('id', ParseIntPipe) id: number) {
  //   console.log('=================');
  //   const test = this.boardService.getOneBoard(id);
  //   return null;
  // }

  // @Get('/:id')
  // getOneBoardTwo(@Param() params: string[]) {
  //   console.log(params);
  //   return null;
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    const test = this.boardService.createBoard(createBoardDto);
    return test;
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidation) status: BoardStatus,
  ): Board {
    console.log('updateBoardStatus');
    console.log(status);
    console.log('================');
    const board = this.boardService.updateBoardStatus(id, status);
    return board;
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): void {
    const test = this.boardService.deleteBoard(id);
    return null;
  }

  // @Post()
  // createBoard(
  //   @Body('title') title : string,
  //   @Body('desc') desc : string
  // ) {
  //   console.log('==createBoard')
  //   const test = this.boardService.createBoard(title, desc)
  //   return test
  // }

  // @Post()
  // createBoardTwo(@Body() body) {
  //   console.log('==createBoardTwo')
  //   const test = this.boardService.createBoard()
  //   return test
  // }
}
