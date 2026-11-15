import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Eine Rolle aus der Tabelle role; andere Werte lehnt das Schema mit 400 ab
export const AssignRoleSchema = z
  .object({
    role: z.enum(['admin', 'user']),
  })
  .strict();

export class AssignRoleDto extends createZodDto(AssignRoleSchema) {}
