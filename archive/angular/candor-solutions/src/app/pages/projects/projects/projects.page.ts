import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectCardComponent } from '../../../components/project/project-card/project-card';
import { Button } from '../../../components/ui/button/button';
import type { Project } from '../../../types';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent, Button],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.css',
})
export default class ProjectsPage {
  private projectService = inject(ProjectService);
  protected readonly router = inject(Router);

  private allProjects: Project[] = this.projectService.getAllProjects();

  readonly activeFilter = signal<string>('all');

  get filteredProjects(): Project[] {
    const filtered =
      this.activeFilter() === 'all'
        ? this.allProjects
        : this.allProjects.filter(p => p.status === this.activeFilter());

    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return [...filtered].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  setFilter(status: string): void {
    this.activeFilter.set(status);
  }
}
