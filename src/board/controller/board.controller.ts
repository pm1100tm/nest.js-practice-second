import { User } from 'src/user/entitiy/user.entity';
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
  UseGuards,
} from '@nestjs/common';

import { CreateBoardDto } from './../dto/create-board.dto';
import { BoardStatus } from '../enum/board-status.enum';
import { BoardStatusValidation } from '../pipes/board-status-validation.pipe';

import { BoardService } from '../service/board.service';

import { Board } from './../entity/board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  /** 생성자
   * DI - boardService
   */
  constructor(private readonly boardService: BoardService) {}

  /** 컨트롤러
   * 모든 board 취득
   */
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  /** 컨트롤러
   * board id 를 사용하여, 하나의 board 취득
   */
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  /** 컨트롤러
   * board 생성
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  /** 컨트롤러
   * board 변경
   */
  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidation) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoard(id, status);
  }

  /** 컨트롤러
   * board 삭제
   */
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }

  // @Get('/:id')
  // getOneBoardTwo(@Param() params: string[]) {
  //   console.log(params);
  //   return null;
  // }

  // @Post()
  // createBoard(
  //   @Body('title') title : string,
  //   @Body('desc') desc : string
  // ) {
  //   console.log('==createBoard')
  //   const test = this.boardService.createBoard(title, desc)
  //   return test
  // }
}
