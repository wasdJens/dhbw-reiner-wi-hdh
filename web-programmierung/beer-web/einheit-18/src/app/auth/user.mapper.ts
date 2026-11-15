import { UserWithRolesDto } from './auth.api';
import { User } from './user';

// Server-DTO → Client-Modell: Admin als eigenes Feld
export function toUser(dto: UserWithRolesDto): User {
  return {
    id: dto.id,
    name: dto.name,
    roles: dto.roles,
    isAdmin: dto.roles.includes('admin'),
  };
}
