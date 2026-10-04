import { Injectable } from '@angular/core';
import type { ConsultingRequest } from '../types';
import { requests as rawRequests } from '../data';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private requests: ConsultingRequest[] = [...rawRequests];

  getAllRequests(): ConsultingRequest[] {
    return this.requests;
  }

  getOpenRequests(): ConsultingRequest[] {
    return this.requests.filter(request => request.status === 'open');
  }

  getRequestsByClient(clientId: string): ConsultingRequest[] {
    return this.requests.filter(request => request.clientId === clientId);
  }

  submitRequest(data: any) {
    const req = {
      ...data,
      id: `req-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'open' as const,
    };
    this.requests.push(req);
    return req;
  }
}
