import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board, BoardStatus } from '../model/board.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getOneBoard(id: number): Board {
    return this.boards.find((boards) => boards.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, desc } = createBoardDto;
    const board = {
      id: uuid(),
      title,
      desc,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: number, status: BoardStatus): Board {
    const board = this.getOneBoard(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: number): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
