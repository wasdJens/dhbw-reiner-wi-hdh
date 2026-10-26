import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort: ein User ohne passwordHash; der Serializer entfernt alle anderen Felder
export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export class UserDto extends createZodDto(UserSchema) {}
