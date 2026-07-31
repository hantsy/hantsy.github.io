import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService, MediumPost } from './blog.service';
import { CacheService } from './cache.service';

export const blogResolver: ResolveFn<MediumPost[]> = async () => {
  const cache = inject(CacheService);
  const blogService = inject(BlogService);

  const cached = cache.get<MediumPost[]>('blog-posts');
  if (cached) return cached;

  const posts = await blogService.fetchMediumFeed();
  cache.set('blog-posts', posts);
  return posts;
};
