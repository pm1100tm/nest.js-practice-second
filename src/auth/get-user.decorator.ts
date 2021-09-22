import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entitiy/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
