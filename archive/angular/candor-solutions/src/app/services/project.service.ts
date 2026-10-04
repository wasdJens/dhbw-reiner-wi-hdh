import { Injectable } from '@angular/core';
import type { Project, ProjectStatus } from '../types';
import { projects as rawProjects } from '../data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly d: Project[] = rawProjects;

  getAllProjects(): Project[] {
    return this.d;
  }

  getProjectById(id: string): Project | null {
    return this.d.find(p => p.id === id) ?? null;
  }

  getProjectsByClient(clientId: string): Project[] {
    const r = this.d.filter(x => x.clientId === clientId);
    return r;
  }

  getProjectsByStatus(s: ProjectStatus): Project[] {
    const r = this.d.filter(x => x.status === s);
    return r;
  }

  getTotalBudget(clientId: string): number {
    const r = this.getProjectsByClient(clientId);
    return r.reduce((a, x) => a + x.budget, 0);
  }
}
