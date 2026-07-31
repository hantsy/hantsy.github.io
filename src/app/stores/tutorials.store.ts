import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ContentService, ParsedContent, TutorialMeta } from '../services/content.service';

export type TutorialsData = { year: number; items: ParsedContent<TutorialMeta>[] }[];

interface TutorialsState {
  tutorials: TutorialsData;
  loading: boolean;
  loaded: boolean;
}

const initialState: TutorialsState = {
  tutorials: [],
  loading: false,
  loaded: false,
};

export const TutorialsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tutorials }) => ({
    isEmpty: computed(() => tutorials().length === 0),
  })),
  withMethods((state, contentService = inject(ContentService)) => ({
    async load(): Promise<TutorialsData> {
      if (state.loaded() || state.loading()) return state.tutorials();
      patchState(state, { loading: true });
      try {
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
        patchState(state, { tutorials: data, loaded: true, loading: false });
        return data;
      } catch {
        patchState(state, { loading: false });
        return [];
      }
    },
  }))
);
