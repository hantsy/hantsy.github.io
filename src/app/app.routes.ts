import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { tutorialsResolver } from './services/tutorials.resolver';
import { blogResolver } from './services/blog.resolver';
import { ProfileService } from './data/profile';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index.page'),
    resolve: { profile: () => inject(ProfileService).load() },
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./pages/tutorials.page'),
    resolve: { tutorials: tutorialsResolver },
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog.page'),
    resolve: { posts: blogResolver },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
