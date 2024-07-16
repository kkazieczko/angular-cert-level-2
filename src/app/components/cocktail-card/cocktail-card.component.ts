import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { AlcoholChipComponent } from '../alcohol-chip/alcohol-chip.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [AlcoholChipComponent, RouterModule],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailCardComponent {

  @Input() cocktail: Cocktail;
  @Input() isFavorite: boolean;

  @Output() favoritesClicked = new EventEmitter<string>();

  addToFavoritesClicked() {
    this.favoritesClicked.emit(this.cocktail.id);
  }
}
