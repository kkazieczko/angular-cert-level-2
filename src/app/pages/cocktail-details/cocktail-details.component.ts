import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailApiService } from '../../services/cocktail-api/cocktail-api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AlcoholChipComponent } from '../../components/alcohol-chip/alcohol-chip.component';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule, RouterModule, AlcoholChipComponent],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {

  cocktail: Cocktail;
  isLoading = signal(false);
  isFavorite = computed(() => {
    return this.favoritesService.favorites()[this.cocktail.id]
  });
  
  private routeSub: Subscription;

  constructor(
    private readonly apiService: CocktailApiService,
    private readonly router: ActivatedRoute,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.isLoading.set(true);
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        throw new Error(`No id provided`);
      }
      this.fetchCocktail(id);
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  fetchCocktail(id: string) {
    this.apiService.getCocktail(id).subscribe(cocktail => {
      this.cocktail = cocktail;
      this.isLoading.set(false);
  });
  }

  addToFavoritesClicked() {
    this.favoritesService.toggle(this.cocktail.id);
  }
}
