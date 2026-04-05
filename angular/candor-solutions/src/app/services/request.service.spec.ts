import { TestBed } from '@angular/core/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 4 requests', () => {
    expect(service.getAllRequests()).toHaveLength(4);
  });

  it('should return open requests', () => {
    const open = service.getOpenRequests();
    expect(open.every(r => r.status === 'open')).toBe(true);
    expect(open.length).toBeGreaterThanOrEqual(1);
  });

  it('should return requests for a client', () => {
    const result = service.getRequestsByClient('mueller-partner');
    expect(result.every(r => r.clientId === 'mueller-partner')).toBe(true);
  });

  it('should submit a new request and return it', () => {
    const before = service.getAllRequests().length;
    const newRequest = service.submitRequest({
      clientId: 'techvision-ag',
      title: 'Test Request',
      description: 'Test',
      requestedBy: 'Test User',
      priority: 'low',
    });
    expect(service.getAllRequests()).toHaveLength(before + 1);
    expect(newRequest).toBeTruthy();
    expect(newRequest.title).toBe('Test Request');
  });
});
