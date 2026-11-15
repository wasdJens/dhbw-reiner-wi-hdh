import { BadRequestException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';

// Prüft Parameter gegen die Zod-DTOs; Fehler im Format des Stammdaten-Servers
export const ValidationPipe = createZodValidationPipe({
  createValidationException: (error) => {
    const issue = error instanceof z.ZodError ? error.issues[0] : undefined;
    return new BadRequestException({
      fehler: issue
        ? `Parameter ${issue.path.join('.')} ungültig: ${issue.message}`
        : 'Anfrage ungültig',
      code: 'ANFRAGE_400',
    });
  },
});
