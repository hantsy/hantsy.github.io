import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TutorialsStore, TutorialsData } from '../stores/tutorials.store';

export { TutorialsData };

export const tutorialsResolver: ResolveFn<TutorialsData> = () => {
  const store = inject(TutorialsStore);
  return store.load();
};
