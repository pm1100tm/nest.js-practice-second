import { UserRepository } from './../repository/user.repository';
import { CreateUserDto } from './../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.createUser(createUserDto);
    return user;
  }
}
