// src/app/services/favorites.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private STORAGE_KEY = 'jupiter:favorites';

  // holds the set of favourite IDs
  private favSet = signal<Set<number>>(this.loadFromStorage());

  // exposed as a readonly signal for components
  public readonly favorites = this.favSet;

  constructor() {
    // whenever favSet changes, write back to localStorage
    effect(() => {
      const arr = Array.from(this.favSet());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(arr));
    });
  }

  private loadFromStorage(): Set<number> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? new Set<number>(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  }

  isFav(id: number): boolean {
    return this.favSet().has(id);
  }

  toggle(id: number) {
    const s = new Set(this.favSet());
    if (s.has(id)) s.delete(id);
    else s.add(id);
    this.favSet.set(s);
  }
}
