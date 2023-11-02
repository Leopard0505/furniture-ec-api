import { Role } from '../../common/roles/role.enum';

export interface JwtPayload {
  username: string;
  sub: number;
  roles: Role[];
}
