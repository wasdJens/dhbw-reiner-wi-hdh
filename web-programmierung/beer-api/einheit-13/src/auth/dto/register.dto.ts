import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Neuer User: Name und Passwort; die Rolle vergibt der Server (R7)
export const RegisterSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
