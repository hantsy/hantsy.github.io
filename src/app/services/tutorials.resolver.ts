import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentService, ParsedContent, TutorialMeta } from './content.service';

export type TutorialsData = { year: number; items: ParsedContent<TutorialMeta>[] }[];

export const tutorialsResolver: ResolveFn<TutorialsData> = async () => {
  const contentService = inject(ContentService);
  const tutorials = await contentService.getTutorials();

  const grouped = new Map<number, ParsedContent<TutorialMeta>[]>();
  for (const t of tutorials) {
    const year = t.attributes.year || 0;
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(t);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, items }));
};
