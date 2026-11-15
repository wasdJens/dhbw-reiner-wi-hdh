import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Format aller Fehler des Stammdaten-Servers
export const ErrorSchema = z.object({
  fehler: z.string().meta({ description: 'Beschreibung des Fehlers' }),
  code: z.string().meta({ description: 'Fehlercode', example: 'PERSON_404' }),
});

export class ErrorDto extends createZodDto(ErrorSchema) {}
