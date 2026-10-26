import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
  ) {}

  // null, wenn es den Namen nicht gibt
  findByName(name: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ name });
  }

  // R7: Eine Registrierung vergibt immer die Rolle user.
  // Normal: lena → User mit Rolle user
  // Fehler: Name vergeben → 409 (AuthService prüft vorher)
  async create(name: string, passwordHash: string): Promise<User> {
    const user = await this.usersRepository.save({ name, passwordHash });
    const role = await this.rolesRepository.findOneByOrFail({ name: 'user' });
    await this.userRolesRepository.insert({ userId: user.id, roleId: role.id });
    return user;
  }
}
