import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Namen der Rollen eines Users, zum Beispiel ['admin']
  async findRoles(userId: number): Promise<string[]> {
    const userRoles = await this.userRolesRepository.find({
      where: { userId },
      relations: { role: true },
    });
    return userRoles.map((userRole) => userRole.role.name);
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

  // User mit Rollen für GET /users/me und POST /users/:id/roles
  async findWithRoles(
    id: number,
  ): Promise<{ id: number; name: string; roles: string[] }> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return { id: user.id, name: user.name, roles: await this.findRoles(id) };
  }

  // R7: Ein admin vergibt eine Rolle; eine vorhandene Rolle bleibt einmal
  async assignRole(
    id: number,
    roleName: string,
  ): Promise<{ id: number; name: string; roles: string[] }> {
    await this.findWithRoles(id);
    const role = await this.rolesRepository.findOneByOrFail({ name: roleName });
    // save mit beiden Schlüsseln: fügt ein oder lässt die Zeile unverändert
    await this.userRolesRepository.save({ userId: id, roleId: role.id });
    return this.findWithRoles(id);
  }
}
