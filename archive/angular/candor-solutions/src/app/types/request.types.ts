export type RequestStatus = 'open' | 'in-progress' | 'resolved' | 'declined';
export type RequestPriority = 'low' | 'medium' | 'high';

/** Eine eingehende Beratungsanfrage von einem Kunden */
export interface ConsultingRequest {
  id: string;
  clientId: string;
  title: string;
  description: string;
  requestedBy: string;
  submittedAt: string; // ISO-Datum
  status: RequestStatus;
  priority: RequestPriority;
}
