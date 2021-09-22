import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, desc, status } = createBoard;
    const board = this.create({
      title,
      description: desc,
      status,
    });

    await this.save(board);
    return board;
  }
}
