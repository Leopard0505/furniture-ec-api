import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { EnvConfig } from './interfaces/envconfig.interface';
import { CONFIG_OPTIONS } from './constans';
import { ConfigOptions } from './interfaces/config-options.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const filePath = `.env.${process.env.NODE_ENV || 'development'}`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
