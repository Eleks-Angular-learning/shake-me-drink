import { Component, Input } from '@angular/core';
import { CocktailItem } from '../app.models';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent {
  @Input() cocktail: CocktailItem;

  get name (): string {
    return this.cocktail.strDrink;
  }

  get imageUrl (): string {
    return `url(//${this.cocktail.strDrinkThumb})`;
  }
}
