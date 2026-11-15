import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateOrderSchema } from './create-order.dto';

// Antwort: die Felder aus dem Body und die id, die der Service vergibt
export const OrderSchema = z.object({
  id: z.number().int(),
  ...CreateOrderSchema.shape,
});

export type Order = z.infer<typeof OrderSchema>;

export class OrderDto extends createZodDto(OrderSchema) {}
