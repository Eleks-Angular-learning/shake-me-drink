import { Component } from '@angular/core';
import { CocktailsService } from '../services/cocktails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CocktailsService ]
})
export class AppComponent {
  cocktails: any;
  constructor (private cocktailsService: CocktailsService) {

  }
  title = 'app';

  ngOnInit () {
    this.cocktailsService.getCocktails().subscribe(res => {
      return this.cocktails = res
    });
  }
}
