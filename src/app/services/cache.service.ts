import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private store = new Map<string, any>();

  get<T>(key: string): T | null {
    return this.store.has(key) ? (this.store.get(key) as T) : null;
  }

  set<T>(key: string, value: T): void {
    this.store.set(key, value);
  }
}
