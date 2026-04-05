/** Repräsentiert einen Kunden der Candor Solutions GmbH */
export interface Client {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  contactEmail: string;
  since: string; // ISO-Datum, z.B. "2021-03-15"
  isActive: boolean;
  projectIds: string[];
}
