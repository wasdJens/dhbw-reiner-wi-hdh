import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort auf den Login: das signierte JWT
export const AccessTokenSchema = z.object({
  accessToken: z.string(),
});

export class AccessTokenDto extends createZodDto(AccessTokenSchema) {}
