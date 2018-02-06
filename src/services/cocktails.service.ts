
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CocktailsService {
  constructor (private http: HttpClient) {}

  getCocktails() {
    return this.http.get('//www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .map(res => res['drinks']);
  }
}
