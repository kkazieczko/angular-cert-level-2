import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-alcohol-chip',
  standalone: true,
  imports: [],
  templateUrl: './alcohol-chip.component.html',
  styleUrl: './alcohol-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlcoholChipComponent {
  @Input() isAlcoholic: boolean;
}
