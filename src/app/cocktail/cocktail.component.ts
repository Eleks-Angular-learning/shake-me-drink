import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {
  @Input() cocktail;

  getCocktailStyles (cocktail) {
    return {
      'display': 'flex',
      'align-items': 'flex-end',
      'width': '260px',
      'height': '350px',
      'background-image': `url('http://${cocktail.strDrinkThumb}')`,
      'background-size': 'cover',
      'overflow': 'hidden',
      'border-radius': '10px'
    };
  }
}
