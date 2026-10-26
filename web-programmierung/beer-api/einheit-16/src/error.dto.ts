import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Format aller Fehler: NestJS-Exceptions und die ValidationPipe in AppModule
export const ErrorSchema = z.object({
  message: z.union([z.string(), z.array(z.string())]),
  error: z.string(),
  statusCode: z.number().int(),
});

export class ErrorDto extends createZodDto(ErrorSchema) {}
