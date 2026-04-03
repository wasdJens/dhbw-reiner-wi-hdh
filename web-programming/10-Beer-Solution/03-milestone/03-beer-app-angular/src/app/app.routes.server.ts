import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'beers',
    renderMode: RenderMode.Client,
  },
  {
    path: 'beers/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'beers/create',
    renderMode: RenderMode.Client,
  },
];
