/** Mögliche Status-Werte eines Projekts */
export type ProjectStatus = 'active' | 'completed' | 'planning';

export type ProjectPriority = 'low' | 'medium' | 'high';

/** Repräsentiert ein Beratungsprojekt */
export interface Project {
  id: string;
  title: string;
  clientId: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate: string | null;
  budget: number;
  description: string;
  tags: string[];
}
