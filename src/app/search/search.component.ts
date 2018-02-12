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
  @Input() resetData: Function;

  radioVal: String = 'category';
  filterValue: String = '';
  selectedCategories: Categories = [{strCategory: 'Cocktail'}];

  constructor (private cocktailsService: CocktailsService) {}

  filterChanged () {
    this.onFilter.emit(this.filterValue);
  }

  onGetCocktails (data, category) {
    this.cocktails.emit({data, category});
  }

  onChange (type) {
    this.resetData(type);
  }

  isSelected (category) {
    return this.selectedCategories.find(el => el.strCategory === category.strCategory);
  }

  onSelectCategory (event, category) {
    const isEl = this.selectedCategories.find((el, index) => {
      const isEqualCategories = el.strCategory === category.strCategory;

      if (isEqualCategories) {
        this.selectedCategories.splice(index, 1);
        event.currentTarget.classList.remove('tags-el--selected');
        this.onGetCocktails([], category.strCategory)
        return isEqualCategories;
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
