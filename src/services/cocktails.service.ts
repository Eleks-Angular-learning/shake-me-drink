
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CocktailsList, CocktailDetails } from '../app/app.models';

@Injectable()
export class CocktailsService {
  constructor (private http: HttpClient) {}

  getCocktails(): Observable<CocktailsList> {
    const response = this.http.get('//www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
    return response.pipe(pluck('drinks'));
  }

  getIngredients () {
    const response =  this.http.get('//www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    return response.pipe(pluck('drinks'));
  }

  getCocktailById (id): Observable<CocktailDetails> {
    const response = this.http.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.pipe(pluck('drinks'));
  }
}
