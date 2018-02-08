
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CocktailsList, CocktailDetails } from '../app/app.models';
import { DATA_URL } from '../config/api';
import 'rxjs/add/operator/map';

const DATA_KEY = 'drinks';

@Injectable()
export class CocktailsService {
  constructor (private http: HttpClient) {}

  getCocktails(): Observable<CocktailsList> {
    const response = this.http.get(DATA_URL.COCKTAILS);
    return response.map(data => data[DATA_KEY]);
  }

  getIngredients () {
    const response =  this.http.get(DATA_URL.INGREDIENTS);
    return response.map(data => data[DATA_KEY]);
  }

  getCocktailById (id): Observable<CocktailDetails> {
    const response = this.http.get(`${DATA_URL.COCKTAIL_BY_ID}${id}`);
    return response.map(data => data[DATA_KEY]);
  }

  getDrinksByIngredient (ingredient): Observable<CocktailDetails> {
    const response = this.http.get(`${DATA_URL.COCKTAILS_BY_INGREDIENT}${ingredient}`);
    return response.map(data => data[DATA_KEY]);
  }
}
