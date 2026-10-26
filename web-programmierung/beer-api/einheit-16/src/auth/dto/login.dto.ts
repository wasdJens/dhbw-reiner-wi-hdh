import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Anmeldung mit Name und Passwort im Klartext; nur über HTTPS im Betrieb
export const LoginSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export class LoginDto extends createZodDto(LoginSchema) {}
