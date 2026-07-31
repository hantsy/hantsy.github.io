import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentService, ParsedContent, TutorialMeta } from './content.service';
import { CacheService } from './cache.service';

export type TutorialsData = { year: number; items: ParsedContent<TutorialMeta>[] }[];

export const tutorialsResolver: ResolveFn<TutorialsData> = async () => {
  const cache = inject(CacheService);
  const contentService = inject(ContentService);

  const cached = cache.get<TutorialsData>('tutorials');
  if (cached) return cached;

  const tutorials = await contentService.getTutorials();
  const grouped = new Map<number, ParsedContent<TutorialMeta>[]>();
  for (const t of tutorials) {
    const year = t.attributes.year || 0;
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(t);
  }

  const data = Array.from(grouped.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, items }));

  cache.set('tutorials', data);
  return data;
};
