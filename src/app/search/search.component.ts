import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ CocktailsService ]
})
export class SearchComponent implements OnInit {
  cocktails: any;
  cocktailsFilter: String = '';
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit () {
    this.cocktailsService.getCocktails().subscribe(cocktails => {
      return this.cocktails = cocktails;
    });
  }
}
