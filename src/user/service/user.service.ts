import { AuthService } from './../../auth/auth.service';
import { SignUpUserDto } from '../../auth/dto/sign-up-user.dto';
import { SignInUserDto } from '../../auth/dto/sign-in-user.dto';
import { UserRepository } from './../repository/user.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException('');
    }
    return user;
  }
}
