import { Routes } from '@angular/router';
import HomePage from './pages/home/home/home.page';
import ClientsPage from './pages/clients/clients/clients.page';
import ClientDetailPage from './pages/client-detail/client-detail/client-detail.page';
import ProjectsPage from './pages/projects/projects/projects.page';
import ProjectDetailPage from './pages/project-detail/project-detail/project-detail.page';
import RequestNewPage from './pages/request-new/request-new/request-new.page';
import AboutPage from './pages/about/about/about.page';

export const routes: Routes = [
  { path: '',              component: HomePage },
  { path: 'clients',       component: ClientsPage },
  { path: 'clients/:id',   component: ClientDetailPage },
  { path: 'projects',      component: ProjectsPage },
  { path: 'projects/:id',  component: ProjectDetailPage },
  { path: 'requests/new',  component: RequestNewPage },
  { path: 'about',         component: AboutPage },
  { path: '**',            redirectTo: '' },
];
