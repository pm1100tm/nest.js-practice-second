import { User } from 'src/user/entitiy/user.entity';
import { CreateBoardDto } from './../dto/create-board.dto';
import {
  ConsoleLogger,
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardStatus } from '../enum/board-status.enum';
import { Board } from './../entity/board.entity';
import { v1 as uuid } from 'uuid';
import { BoardRepository } from '../repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  // private boards: Board[] = [];

  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't found Board with the id. ${id}`);
    }

    return found;
  }

  async getBoardListByUser(user: User): Promise<Board[]> {
    return this.boardRepository.getBoardListByUser(user.id);
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    const result = await this.boardRepository.save(board);
    console.log(result);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const board = await this.getBoardById(id);
    if (board.user.id !== user.id) {
      throw new UnauthorizedException('Not author of the board.');
    }

    await this.boardRepository.deleteBoard(id, user.id);
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // getOneBoard(id: number): Board {
  //   return this.boards.find((boards) => boards.id === id);
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, desc } = createBoardDto;
  //   const board = {
  //     id: uuid(),
  //     title,
  //     desc,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // updateBoardStatus(id: number, status: BoardStatus): Board {
  //   const board = this.getOneBoard(id);
  //   board.status = status;
  //   return board;
  // }

  // deleteBoard(id: number): void {
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
}
