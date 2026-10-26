import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Neuer User: Name und Passwort; die Rolle vergibt der Server (R7)
// strict: Ein Feld roles im Body antwortet mit 400 (Mass Assignment)
export const RegisterSchema = z
  .object({
    name: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();

export class RegisterDto extends createZodDto(RegisterSchema) {}
