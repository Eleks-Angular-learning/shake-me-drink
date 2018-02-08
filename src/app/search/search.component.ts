import { Component, EventEmitter, Output } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ CocktailsService ]
})
export class SearchComponent {
  @Output() onFilter = new EventEmitter();
  @Output() cocktails = new EventEmitter();

  radioVal: String = 'category';
  filterValue: String = '';

  filterChanged () {
    this.onFilter.emit(this.filterValue);
  }

  onGetCocktails (data) {
    this.cocktails.emit(data);
  }
}
