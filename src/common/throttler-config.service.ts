import { Injectable } from '@nestjs/common';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    const ttl = this.configService.get<number>('THROTTLE_TTL');
    const limit = this.configService.get<number>('THROTTLE_LIMIT');
    return { throttlers: [{ ttl, limit }] };
  }
}
