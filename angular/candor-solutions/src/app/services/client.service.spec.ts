import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 5 clients', () => {
    expect(service.getAllClients()).toHaveLength(5);
  });

  it('should find client by ID', () => {
    const client = service.getClientById('techvision-ag');
    expect(client).toBeTruthy();
    expect(client!.name).toBe('TechVision AG');
  });

  it('should return null for unknown client ID', () => {
    expect(service.getClientById('unknown')).toBeNull();
  });

  it('should return only active clients', () => {
    const active = service.getActiveClients();
    expect(active.every((c: { isActive: boolean }) => c.isActive)).toBe(true);
    expect(active.length).toBeLessThan(5); // bauer-consulting is inactive
  });

  it('should search clients by name', () => {
    const results = service.searchClients('TechVision');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('techvision-ag');
  });

  it('should search clients by industry', () => {
    const results = service.searchClients('Finance');
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('should return all clients for empty search', () => {
    expect(service.searchClients('')).toHaveLength(5);
    expect(service.searchClients('  ')).toHaveLength(5);
  });

  it('should return unique industries sorted', () => {
    const industries = service.getIndustries();
    expect(industries).toEqual([...new Set(industries)].sort());
    expect(industries).toContain('Finance');
    expect(industries).toContain('IT');
  });
});
