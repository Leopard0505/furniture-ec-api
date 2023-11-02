import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HashService } from './hash.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './jwt-config.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HashService,
    ConfigService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
