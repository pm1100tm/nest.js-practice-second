import { CreateBoardDto } from './../dto/create-board.dto';
import {
  ConsoleLogger,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { BoardStatus } from '../enum/board-status.enum';
import { Board } from './../entity/board.entity';
import { v1 as uuid } from 'uuid';
import { BoardRepository } from '../repositories/board.repository';
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

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    const result = await this.boardRepository.save(board);
    console.log(result);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't found Board with the id. ${id}`);
    }
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
