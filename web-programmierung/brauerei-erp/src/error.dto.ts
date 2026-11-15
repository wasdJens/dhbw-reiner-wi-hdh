import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Format aller Fehler des ERP
export const ErrorSchema = z.object({
  fehler: z.string().meta({ description: 'Beschreibung des Fehlers' }),
  code: z.string().meta({ description: 'Fehlercode', example: 'ARTIKEL_404' }),
});

export class ErrorDto extends createZodDto(ErrorSchema) {}
