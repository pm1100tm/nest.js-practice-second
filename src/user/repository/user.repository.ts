import { User } from './../entitiy/user.entity';
import { SignUpUserDto } from '../../auth/dto/sign-up-user.dto';
import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(signUpUserDto: SignUpUserDto): Promise<User> {
    const { username, password, email } = signUpUserDto;

    const user = this.create({
      username,
      password,
      email,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Already Exsiting username:: ${username}`);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
