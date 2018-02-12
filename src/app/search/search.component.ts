import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { Categories } from '../app.models';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ CocktailsService ]
})
export class SearchComponent {
  @Output() onFilter = new EventEmitter();
  @Output() cocktails = new EventEmitter();
  @Input() categories: Array<Object> = [];

  radioVal: String = 'category';
  filterValue: String = '';
  selectedCategories: Categories = [{strCategory: 'Cocktail'}];
  defaultCategory: String = 'Cocktail';

  constructor (private cocktailsService: CocktailsService) {

  }

  filterChanged () {
    this.onFilter.emit(this.filterValue);
  }

  onGetCocktails (data, category) {
    this.cocktails.emit({data, category});
  }

  onChange () {
    this.onGetCocktails([], null);
  }

  onSelectCategory (event, category) {
    const isEl = this.selectedCategories.find((el, index) => {

      if (el.strCategory === category.strCategory) {
        this.selectedCategories.splice(index, 1);
        event.currentTarget.classList.remove('tags-el--selected');
        this.onGetCocktails([], category.strCategory)
        return el.strCategory === category.strCategory;
      }
    });

    if (!isEl) {
      this.cocktailsService.getCocktails(category.strCategory)
        .subscribe(cocktails => this.onGetCocktails(cocktails, category.strCategory));
      this.selectedCategories.push(category);
      event.currentTarget.classList.add('tags-el--selected');
    }
  }
}
