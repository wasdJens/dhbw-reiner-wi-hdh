import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { UserSchema } from './user.dto';

// Antwort: User ohne passwordHash, dazu die Namen seiner Rollen
export const UserWithRolesSchema = UserSchema.extend({
  roles: z.array(z.string()),
});

export class UserWithRolesDto extends createZodDto(UserWithRolesSchema) {}
