import { BoardStatus } from '../enum/board-status.enum';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entitiy/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: false,
  })
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.board, { eager: true })
  user: User;
}
