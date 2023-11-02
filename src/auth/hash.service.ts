import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  // ハッシュ化
  async generateHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return {
      salt,
      hash,
    };
  }

  // パスワードの比較・チェック
  async isMatch(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
