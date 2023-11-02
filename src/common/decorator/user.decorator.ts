import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../../users/interface/user.interface';

export const User = createParamDecorator<RequestUser>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
