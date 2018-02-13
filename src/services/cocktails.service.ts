
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck, tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/Rx';
import { CocktailsList, CocktailDetails, IngredientItem } from '../app/app.models';
import { DATA_URL } from '../config/api';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export const DATA_KEY = 'drinks';
const handleNullable = (data: CocktailsList) => {
  return data === null || data === undefined ? Observable.of([]) : Observable.of(data);
};

@Injectable()
export class CocktailsService {
  constructor (private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return Observable.throw(
      'Something bad happened; please try again later.');
  }

  getCocktails(): Observable<CocktailsList> {
    const response = this.http.get(DATA_URL.COCKTAILS);
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
}
