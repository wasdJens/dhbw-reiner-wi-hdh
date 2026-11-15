import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Gültige Daten für eine neue Brauerei; die id vergibt der Service
export const CreateBrewerySchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Klasse aus dem Schema: Nur eine Klasse prüft die ZodValidationPipe
export class CreateBreweryDto extends createZodDto(CreateBrewerySchema) {}
