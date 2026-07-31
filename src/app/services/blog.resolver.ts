import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogStore } from '../stores/blog.store';
import { MediumPost } from './blog.service';

export const blogResolver: ResolveFn<MediumPost[]> = () => {
  const store = inject(BlogStore);
  return store.load();
};
