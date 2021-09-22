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
  Logger,
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
  private logger = new Logger(BoardController.name);
  constructor(private readonly boardService: BoardService) {}

  /**
   * 모든 Board 취득함.
   * @returns Board[]
   */
  @Get()
  getAllBoard(): Promise<Board[]> {
    this.logger.verbose('Get - getAllBoard');
    return this.boardService.getAllBoards();
  }

  /**
   * Board Id 로 하나의 Board 취득
   * @param id
   * @returns Board
   */
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    this.logger.verbose('Get - getBoardById', JSON.stringify(id));
    return this.boardService.getBoardById(id);
  }

  /**
   * Board 생성
   * @param createBoardDto
   * @param user
   * @returns Board
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`Post - createBoard. CreateBoardDto: ${JSON.stringify(createBoardDto)}, UserId: ${user.id}`)
    return this.boardService.createBoard(createBoardDto, user);
  }

  /**
   * 해당 ID Board 의 status 값만 변경
   * @param id
   * @param status
   * @returns
   */
  @Patch('/:id/status')
  updateBoard(@Param('id', ParseIntPipe) id: number, @Body('status', BoardStatusValidation) status: BoardStatus): Promise<Board> {
    this.logger.verbose(`Patch - updateBoard. status: ${status}, UserId: ${id}`)
    return this.boardService.updateBoard(id, status);
  }

  /**
   * 해당 ID 의 Board 삭제 (본인만 삭제 가능)
   * @param id
   * @param user
   * @returns
   */
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`Delete - deleteBoard. BoardId: ${id}, UserId: ${user.id}`)
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
