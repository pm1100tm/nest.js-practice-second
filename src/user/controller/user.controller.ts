import { CreateUserDto } from './../dto/create-user.dto';
import { UserService } from './../service/user.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from '../entitiy/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
