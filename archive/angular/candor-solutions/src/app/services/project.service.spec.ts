import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 7 projects', () => {
    expect(service.getAllProjects()).toHaveLength(7);
  });

  it('should find project by ID', () => {
    const project = service.getProjectById('cybersecurity');
    expect(project).toBeTruthy();
    expect(project!.title).toBe('Cybersecurity Assessment');
  });

  it('should return null for unknown project ID', () => {
    expect(service.getProjectById('unknown')).toBeNull();
  });

  it('should return projects for a client', () => {
    const projects = service.getProjectsByClient('mueller-partner');
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects.every(p => p.clientId === 'mueller-partner')).toBe(true);
  });

  it('should return projects by status', () => {
    const active = service.getProjectsByStatus('active');
    expect(active.every(p => p.status === 'active')).toBe(true);
  });

  it('should calculate total budget for a client', () => {
    const budget = service.getTotalBudget('mueller-partner');
    expect(budget).toBeGreaterThan(0);
    expect(typeof budget).toBe('number');
  });
});
