import { User } from 'src/user/entitiy/user.entity';
import { BoardService } from './../../board/service/board.service';
import { Board } from './../../board/entity/board.entity';
import { UserService } from './../service/user.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  /** 컨트롤러
   * 해당 유저가 작성한 board 리스트 취득
   */
  @UseGuards(AuthGuard())
  @Get('boards')
  getBoardListByUser(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getBoardListByUser(user);
  }
}
