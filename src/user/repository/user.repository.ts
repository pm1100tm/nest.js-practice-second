import { User } from './../entitiy/user.entity';
import { CreateUserDto } from './../dto/create-user.dto';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('user repo');
    const { username, password, email } = createUserDto;
    const user = this.create({
      username,
      password,
      email,
    });
    const result = await this.save(user);
    console.log(result);
    return user;
  }
}
