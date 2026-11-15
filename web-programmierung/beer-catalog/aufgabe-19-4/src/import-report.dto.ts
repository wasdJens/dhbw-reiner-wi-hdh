import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Bericht eines Imports: Was ist mit jedem Datensatz aus dem ERP passiert?
export const ImportReportSchema = z.object({
  created: z.number().int(),
  updated: z.number().int(),
  unchanged: z.number().int(),
  skipped: z.number().int(),
});

export type ImportReport = z.infer<typeof ImportReportSchema>;

export class ImportReportDto extends createZodDto(ImportReportSchema) {}
