import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CocktailComponent {
  @Input() cocktail;

getImageUrl (cocktail) {
  return `http://${cocktail.strDrinkThumb}`;
}
}
