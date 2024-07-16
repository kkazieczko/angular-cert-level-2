import { ChangeDetectionStrategy, Component, OnInit, computed, input, model, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CocktailCardComponent } from '../../components/cocktail-card/cocktail-card.component';
import { CocktailApiService } from '../../services/cocktail-api/cocktail-api.service';
import { FormsModule } from '@angular/forms';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CommonModule } from '@angular/common';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CocktailCardComponent, FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit{

  cocktails = signal<Cocktail[]>([]);
  filterInput = signal('');

  favorites = this.favoritesService.favorites;

  filteredCocktails = computed(() => {
    const input = this.filterInput().toLowerCase();
    return this.cocktails().filter(cocktail => {
      return cocktail.name.toLowerCase().includes(input);
    });
  });

  constructor(
    private readonly api: CocktailApiService,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  toggleFavorites(id: string) {
    this.favoritesService.toggle(id);
  }

  private fetchData() {
    this.api.getCocktails().subscribe(cocktails => {
      this.cocktails.set(cocktails);
    });
  }
}
