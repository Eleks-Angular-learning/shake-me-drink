import {Component, OnDestroy, OnInit} from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { CocktailsList } from '../app.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  cocktailsList: CocktailsList = [];
  filteredCocktailsList: CocktailsList = [];
  cocktailsSubscription: Subscription;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit () {
    const cocktailsSource$ = this.cocktailsService.getCocktails();
    this.cocktailsSubscription = cocktailsSource$.subscribe(cocktails => {
      this.filteredCocktailsList = cocktails;
      this.cocktailsList = cocktails;
    });
  }

  ngOnDestroy () {
    if (this.cocktailsSubscription) {
      this.cocktailsSubscription.unsubscribe();
    }
  }

  onFilterChange (filter: string) {
    this.filteredCocktailsList = this.cocktailsList.filter(cocktail => cocktail['strDrink'].match(new RegExp(filter, 'gi')));
  }
}
