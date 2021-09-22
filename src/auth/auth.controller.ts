import { SignInUserDto } from '../auth/dto/sign-in-user.dto';
import { SignUpUserDto } from '../auth/dto/sign-up-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/entitiy/user.entity';

@Controller('user')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  /**
   * User 생성
   * @param signUpUserDto
   * @returns User Entity
   */
  @Post('sign-up')
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<User> {
    this.logger.verbose('Post - signUp', JSON.stringify(signUpUserDto));
    return this.authService.signUpUser(signUpUserDto);
  }

  /**
   * User 로그인
   * @param signInUserDto
   * @returns User Entity
   */
  @Post('sign-in')
  signIn(@Body(ValidationPipe) signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
    this.logger.verbose('Post - signIn', JSON.stringify(signInUserDto));
    return this.authService.signInUser(signInUserDto);
  }
}
