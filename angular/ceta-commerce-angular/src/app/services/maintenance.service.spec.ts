import { TestBed } from '@angular/core/testing';
import { MaintenanceService } from './maintenance.service';

describe('MaintenanceService', () => {
  let service: MaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial requests', () => {
    const requests = service.getAllRequests();
    expect(requests.length).toBeGreaterThanOrEqual(5);
  });

  it('should find request by ID', () => {
    const request = service.getRequestById('maint-001');
    expect(request).toBeTruthy();
    expect(request!.productName).toBe('CetaCore');
  });

  it('should return null for unknown ID', () => {
    expect(service.getRequestById('unknown')).toBeNull();
  });

  it('should filter by status', () => {
    const pending = service.getRequestsByStatus('pending');
    expect(pending.length).toBeGreaterThanOrEqual(1);
    expect(pending.every((r) => r.status === 'pending')).toBe(true);
  });

  it('should calculate open request count', () => {
    const openCount = service.openRequestCount();
    const allRequests = service.getAllRequests();
    const manualCount = allRequests.filter((r) => r.status !== 'completed').length;
    expect(openCount).toBe(manualCount);
  });

  it('should create new request', () => {
    const initialCount = service.getAllRequests().length;

    const newRequest = service.createRequest({
      productId: 'ceta-core',
      productName: 'CetaCore',
      variantTier: 'basic',
      description: 'Test-Anfrage',
      priority: 'low',
      contactEmail: 'test@example.com',
    });

    expect(newRequest.id).toBeTruthy();
    expect(newRequest.status).toBe('pending');
    expect(newRequest.scheduledDate).toBeNull();
    expect(service.getAllRequests().length).toBe(initialCount + 1);
  });

  it('should update request status', () => {
    const updated = service.updateRequestStatus('maint-003', 'scheduled');
    expect(updated).toBeTruthy();
    expect(updated!.status).toBe('scheduled');
  });

  it('should return null when updating unknown request', () => {
    expect(service.updateRequestStatus('unknown', 'completed')).toBeNull();
  });
});
