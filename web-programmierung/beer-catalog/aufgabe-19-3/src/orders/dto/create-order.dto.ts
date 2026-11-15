import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Gültige Daten für eine Bestellung; die id vergibt der Service
export const CreateOrderSchema = z.object({
  beerId: z.number().int(),
  bottles: z.number().int().min(1),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
