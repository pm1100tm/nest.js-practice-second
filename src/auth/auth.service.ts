import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { User } from 'src/user/entitiy/user.entity';
import { UserRepository } from './../user/repository/user.repository';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * 유저를 생성하면서 패스워드 복호화
   * @param signUpUserDto
   * @returns User Entity
   */
  async signUpUser(signUpUserDto: SignUpUserDto): Promise<User> {
    this.logger.verbose('signUpUser');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpUserDto.password, salt);
    signUpUserDto.password = hashedPassword;

    return this.userRepository.createUser(signUpUserDto);
  }

  /**
   * 유저 로그인. 엑세스 토큰을 발행함.
   * @param signInUserDto
   * @returns
   */
  async signInUser(
    signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose('signInUser');

    const { username, password } = signInUserDto;
    const user = await this.userRepository.findOne({ username });

    if (await bcrypt.compare(password, user.password)) {
      console.log('sign in success');
      const accessToken = await this.generateToken(username);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Login failed. Plaese check your id or password.',
      );
    }
  }

  /** 서비스
   * 유저 토큰 생성
   */
  async generateToken(username: string): Promise<string> {
    this.logger.verbose('signUpUser');

    const payload = { username };
    try {
      return await this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Error for creating accessToken');
    }
  }
}
