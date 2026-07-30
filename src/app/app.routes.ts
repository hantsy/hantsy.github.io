import { Routes } from '@angular/router';
import { tutorialsResolver } from './services/tutorials.resolver';
import { blogResolver } from './services/blog.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index.page'),
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./pages/tutorials.page'),
    resolve: { tutorials: tutorialsResolver },
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/index.page'),
    resolve: { posts: blogResolver },
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
