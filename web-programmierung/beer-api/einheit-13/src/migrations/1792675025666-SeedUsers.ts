import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../users/role.entity';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-role.entity';

// Beispiel-User aus anforderungen.md; Passwörter in users.txt, hier nur die Hashes
export class SeedUsers1792675025666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Role, [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ]);
    await queryRunner.manager.insert(User, [
      {
        id: 1,
        name: 'admin',
        passwordHash:
          '$2b$10$o6W5KznaQaytXGZ1itv87ODpeic6pzT91PoVsjnx5FyGIMimNJW/q',
      },
      {
        id: 2,
        name: 'gast',
        passwordHash:
          '$2b$10$AFagePMwoLiL.dNwc6RuMOPQm0YEIHWeea8QrreF9LU33HdLbfkm.',
      },
    ]);
    // admin hat die Rolle admin, gast die Rolle user
    await queryRunner.manager.insert(UserRole, [
      { userId: 1, roleId: 1 },
      { userId: 2, roleId: 2 },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserRole, {});
    await queryRunner.manager.delete(User, [1, 2]);
    await queryRunner.manager.delete(Role, [1, 2]);
  }
}
