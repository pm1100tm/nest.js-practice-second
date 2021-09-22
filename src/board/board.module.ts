import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repository/board.repository';
import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { BoardService } from './service/board.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
