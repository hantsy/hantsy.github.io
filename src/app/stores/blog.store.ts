import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { BlogService, MediumPost } from '../services/blog.service';

interface BlogState {
  posts: MediumPost[];
  loading: boolean;
  loaded: boolean;
}

const initialState: BlogState = {
  posts: [],
  loading: false,
  loaded: false,
};

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ posts }) => ({
    isEmpty: computed(() => posts().length === 0),
  })),
  withMethods((state, blogService = inject(BlogService)) => ({
    async load(): Promise<MediumPost[]> {
      if (state.loaded() || state.loading()) return state.posts();
      patchState(state, { loading: true });
      try {
        const posts = await blogService.fetchMediumFeed();
        patchState(state, { posts, loaded: true, loading: false });
        return posts;
      } catch {
        patchState(state, { loading: false });
        return [];
      }
    },
  }))
);
