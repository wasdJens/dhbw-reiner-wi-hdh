import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

// RBAC: Die Zuordnung steht in einer eigenen Tabelle, nicht am User
@Entity()
export class UserRole {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roleId: number;

  // Fremdschlüssel userId → user.id; mit dem User fallen seine Rollen weg
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // Fremdschlüssel roleId → role.id
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
