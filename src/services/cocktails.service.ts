import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { pluck, mergeAll, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import {
  Categories,
  CocktailsList,
  CocktailItem,
  CocktailDetails,
  IngredientItem
} from '../app/app.models';
import { DATA_URL } from '../config/api';

export const DATA_KEY = 'drinks';

@Injectable()
export class CocktailsService {
  private handleError: HandleError;

  constructor (
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('CocktailsService');
    }

  getCocktails(category: string): Observable<CocktailsList> {
    const url = `${DATA_URL.COCKTAILS}${category}`;
    return this.http.get(url)
      .pipe(
        pluck(DATA_KEY),
        catchError<CocktailsList, CocktailsList>(
          this.handleError<CocktailsList>('getCocktails', []))
      );
  }

  getIngredients (): Observable<Array<IngredientItem>> {
    const url = DATA_URL.INGREDIENTS;
    return this.http.get(DATA_URL.INGREDIENTS)
      .pipe(
        pluck(DATA_KEY),
        catchError<Array<IngredientItem>, Array<IngredientItem>>(
          this.handleError<Array<IngredientItem>>('getIngredients', []))
      );
  }

  getCocktailById (id: number): Observable<CocktailDetails> {
    const url = `${DATA_URL.COCKTAIL_BY_ID}${id}`;
    return  this.http.get(url)
      .pipe(
        pluck(DATA_KEY),
        mergeAll<CocktailDetails>(),
        catchError<CocktailDetails, CocktailDetails>(
          this.handleError<CocktailDetails>('getCocktailById', <CocktailDetails>{}))
      );
  }

  getDrinksByIngredient (ingredient: string): Observable<CocktailsList> {
    const url = `${DATA_URL.COCKTAILS_BY_INGREDIENT}${ingredient}`;
    return this.http.get(url)
      .pipe(
        pluck(DATA_KEY),
        catchError<CocktailsList, CocktailsList>(
          this.handleError<CocktailsList>('getDrinksByIngredient', <CocktailsList>[]))
      );
  }

  getCategories(): Observable<Categories> {
    const response = this.http.get(DATA_URL.CATEGORIES);
    return response.pipe(pluck('drinks'));
  }
}
