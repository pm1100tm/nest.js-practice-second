import { UserRepository } from './../user/repository/user.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { type } from 'os';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async generateToken(username: string): Promise<string> {
    const payload = { username };
    try {
      return await this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Error for creating accessToken');
    }
  }
}
