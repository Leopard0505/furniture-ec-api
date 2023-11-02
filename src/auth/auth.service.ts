import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { Signup } from './interface/signup.interface';
import { HashService } from './hash.service';
import { Role } from '../common/roles/role.enum';
import { UserAccountService } from '../users/user-account.service';
import { RequestUser } from '../users/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(username: string, password: string): Promise<RequestUser> {
    const account = await this.userAccountService.findOne(username);
    if (!account) {
      return null;
    }
    const { hash, ...result } = account;
    const isMatch = await this.hashService.isMatch(password, hash);
    if (!isMatch) {
      return null;
    }
    return result;
  }

  async signup(user: Signup) {
    const { hash } = await this.hashService.generateHash(user.password);
    await this.userService.create(user.username, hash);
  }

  async login(user: RequestUser) {
    const payload: JwtPayload = {
      username: user.name,
      sub: user.id,
      roles: [Role.User],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
