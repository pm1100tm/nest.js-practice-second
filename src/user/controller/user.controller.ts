import { SignUpUserDto } from './../dto/sign-up-user.dto';
import { SignInUserDto } from '../dto/sign-in-user.dto';
import { UserService } from './../service/user.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from '../entitiy/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<User> {
    return this.userService.signUpUser(signUpUserDto);
  }

  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signInUser(signInUserDto);
  }
}
