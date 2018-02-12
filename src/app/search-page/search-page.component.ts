import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { CocktailsList, Categories } from '../app.models';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  cocktailsList: CocktailsList = [];
  filteredCocktailsList: CocktailsList = [];
  filteredByIngredientCocktails: CocktailsList = [];
  categories: Categories = [];
  categoriesSubscription: Subscription;
  cocktailsSubscription: Subscription;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit () {
    const cocktailsSource$ = this.cocktailsService.getCocktails('Cocktail');
    this.cocktailsSubscription = cocktailsSource$.subscribe(cocktails => {
      this.filteredCocktailsList = cocktails;
      this.cocktailsList = cocktails;
    });

    const categoriesSource$ = this.cocktailsService.getCategories();
    this.categoriesSubscription = categoriesSource$.subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy () {
    if (this.cocktailsSubscription) {
      this.cocktailsSubscription.unsubscribe();
    }
  }

  onFilterChange (filter: string) {
    this.filteredCocktailsList = this.filterData(this.cocktailsList, filter);
    if (this.filteredByIngredientCocktails.length) {
      this.filteredCocktailsList = this.filterData(this.filteredByIngredientCocktails, filter);
    }
  }

  filterData (list, filter) {
    return list.filter(cocktail => cocktail['strDrink'].match(new RegExp(filter, 'gi')));
  }

  onGetCocktails (data) {
    if (data.length) {
      this.filteredByIngredientCocktails = data;
    } else {
      this.filteredByIngredientCocktails = this.cocktailsList;
    }
    this.filteredCocktailsList = this.filteredByIngredientCocktails;
  }
}
