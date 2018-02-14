import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { CocktailsList, Categories, DataByTagList } from '../app.models';
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
  fullCocktailsLists: DataByTagList = [];

  constructor(private cocktailsService: CocktailsService) {
    this.onResetData = this.onResetData.bind(this);
  }

  ngOnInit () {
    const cocktailsSource$ = this.cocktailsService.getCocktails('Cocktail');
    this.cocktailsSubscription = cocktailsSource$.subscribe(cocktails => {
      this.filteredCocktailsList = cocktails;
      this.cocktailsList = cocktails;

      this.filteredByIngredientCocktails.push(...cocktails);

      this.fullCocktailsLists.push({
        category: 'Cocktail',
        data: cocktails
      });
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
    const toLowerCase = str => String(str).toLowerCase();
    const filterFn = ({strDrink}) => toLowerCase(strDrink).includes(toLowerCase(filter));
    return list.filter(filterFn);
  }

  onGetCocktails (args) {
    const {data, category} = args;
    const isEl = this.fullCocktailsLists.find((el, index) => {
      const isEqualCategories = el.category === category;
      if (isEqualCategories) {
        this.fullCocktailsLists.splice(index, 1);
      }
      return isEqualCategories;
    });

    if (!isEl && category) {
      this.fullCocktailsLists.push({
        category,
        data
      });
    }

    this.filteredByIngredientCocktails = [];

    if (category) {
      this.getCocktailsByCategory();
    } else {
      this.filteredByIngredientCocktails = data;
      this.filteredCocktailsList = data;
    }
  }

  getCocktailsByCategory () {
    this.fullCocktailsLists.map(el =>
      this.filteredByIngredientCocktails = <CocktailsList>this.filteredByIngredientCocktails.concat(el.data));
    this.filteredCocktailsList = this.filteredByIngredientCocktails;
  }

  onResetData (type) {
    if (type === 'category') {
      this.filteredByIngredientCocktails = [];
      this.getCocktailsByCategory();
    } else {
      this.filteredCocktailsList = [];
    }
  }
}
