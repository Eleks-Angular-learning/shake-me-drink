
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CocktailsList, CocktailDetails, IngredientItem, Categories } from '../app/app.models';
import { DATA_URL } from '../config/api';

const DATA_KEY = 'drinks';
@Injectable()
export class CocktailsService {
  constructor (private http: HttpClient) {}

  getCocktails(category): Observable<CocktailsList> {
    const response = this.http.get(`${DATA_URL.COCKTAILS}${category}`);
    return response.pipe(pluck(DATA_KEY));
  }

  getIngredients (): Observable<Array<IngredientItem>> {
    const response =  this.http.get(DATA_URL.INGREDIENTS);
    return response.pipe(pluck(DATA_KEY));
  }

  getCocktailById (id): Observable<CocktailDetails> {
    const response = this.http.get(`${DATA_URL.COCKTAIL_BY_ID}${id}`);
    return response.pipe(pluck(DATA_KEY));
  }

  getDrinksByIngredient (ingredient): Observable<CocktailDetails> {
    const response = this.http.get(`${DATA_URL.COCKTAILS_BY_INGREDIENT}${ingredient}`);
    return response.pipe(pluck(DATA_KEY));
  }

  getCategories(): Observable<Categories> {
    const response = this.http.get(DATA_URL.CATEGORIES);
    return response.pipe(pluck('drinks'));
  }
}
