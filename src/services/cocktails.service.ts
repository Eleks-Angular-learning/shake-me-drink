
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CocktailsService {
  constructor (private http: Http) {

  }

  getCocktails() {
    return this.http.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .map(response => response.json())
    .map(response => response.drinks);
  }
}
