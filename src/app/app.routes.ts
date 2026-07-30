import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index.page'),
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./pages/tutorials.page'),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/index.page'),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/[slug].page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
