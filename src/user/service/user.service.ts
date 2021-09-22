import { AuthService } from './../../auth/auth.service';
import { SignUpUserDto } from './../dto/sign-up-user.dto';
import { SignInUserDto } from './../dto/sign-in-user.dto';
import { UserRepository } from './../repository/user.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async getUserByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException('');
    }
    return user;
  }

  async signUpUser(signUpUserDto: SignUpUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpUserDto.password, salt);
    signUpUserDto.password = hashedPassword;

    return this.userRepository.createUser(signUpUserDto);
  }

  async signInUser(
    signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signInUserDto;
    const user = await this.getUserByUserName(username);

    if (await bcrypt.compare(password, user.password)) {
      console.log('sign in success');
      const accessToken = await this.authService.generateToken(username);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Login failed. Plaese check your id or password.',
      );
    }
  }
}
