import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordConfirmGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { password, password_confirm } = request.body;
    return this.matchPassword(password, password_confirm);
  }

  private matchPassword(password: string, password_confirm: string) {
    if (password !== password_confirm) {
      throw new BadRequestException();
    }
    return true;
  }
}
