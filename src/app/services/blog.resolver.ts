import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService, MediumPost } from './blog.service';

export const blogResolver: ResolveFn<MediumPost[]> = async () => {
  const blogService = inject(BlogService);
  return await blogService.fetchMediumFeed();
};
