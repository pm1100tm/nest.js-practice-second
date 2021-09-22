import { User } from 'src/user/entitiy/user.entity';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoard: CreateBoardDto, user: User): Promise<Board> {
    const { title, desc, status } = createBoard;
    const board = this.create({
      title,
      description: desc,
      status,
      user: user,
    });

    await this.save(board);
    return board;
  }

  async getBoardListByUser(userId: number): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: userId });
    const boardList = await query.getMany();
    return boardList;
  }
}
