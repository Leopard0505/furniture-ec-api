import { Role } from '../../common/roles/role.enum';
import { UserAccount } from '@prisma/client';

export type RequestUser = Omit<UserAccount, 'hash'>;
