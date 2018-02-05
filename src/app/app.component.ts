import {Component, OnInit} from '@angular/core';
import { CocktailsService } from '../services/cocktails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CocktailsService ]
})
export class AppComponent implements OnInit {
  cocktails: any;
  constructor (private cocktailsService: CocktailsService) {}

  ngOnInit () {
    this.cocktailsService.getCocktails().subscribe(cocktails => {
      return this.cocktails = cocktails;
    });
  }
}
