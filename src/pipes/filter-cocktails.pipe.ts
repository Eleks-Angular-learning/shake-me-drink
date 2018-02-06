import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCocktails'
})
export class FilterCocktailsPipe implements PipeTransform {

  transform(cocktails: any, filterValue: any): any {
    if (cocktails && cocktails.length) {
      return cocktails.filter(cocktail => {
        cocktail.name = cocktail.strDrink;
        if (cocktail.name) {
          return cocktail.name.match(new RegExp(filterValue, 'gi'));
        }
      });
    }
  }

}
