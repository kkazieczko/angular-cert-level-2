import { Injectable, computed, signal } from '@angular/core';

interface FavoritesMap { [key: string]: boolean };

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly localStorageId = 'favorites';
  private selected = signal<string[]>([])

  favorites = computed(() => {
    return this.selected().reduce((favorites: FavoritesMap , id) => {
      favorites[id] = true;
      return favorites;
    }, {});
  });

  constructor() { 
    this.getFromLocalStorage();
  }

  private getFromLocalStorage() {
    const favorites = localStorage.getItem(this.localStorageId);
    if (favorites) {
      this.selected.set(JSON.parse(favorites));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageId, JSON.stringify(this.selected()));
  }

  add(id: string) {
    if (!this.selected().includes(id)) {
      this.selected.set([...this.selected(), id]);
      this.saveToLocalStorage();
    }
  }

  remove(id: string) {
    this.selected.set(this.selected().filter((item) => item !== id));
    this.saveToLocalStorage();
  }

  toggle(id: string) {
    if (this.selected().includes(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }
}
