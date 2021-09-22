import { SignInUserDto } from '../auth/dto/sign-in-user.dto';
import { SignUpUserDto } from '../auth/dto/sign-up-user.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entitiy/user.entity';

@Controller('user')
export class AuthController {
  /** 컨트롤러
   * 생성자 - authService
   */
  constructor(private readonly authService: AuthService) {}

  /** 컨트롤러
   * 유저 생성
   */
  @Post('sign-up')
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<User> {
    return this.authService.signUpUser(signUpUserDto);
  }

  /** 컨트롤러
   * 유저 로그인
   */
  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInUser(signInUserDto);
  }
}
