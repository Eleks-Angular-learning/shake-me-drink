import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CocktailsService } from '../../services/cocktails.service';
import {CocktailDetails} from '../app.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements OnInit {
  cocktail: CocktailDetails = null;
  cocktailSubscription: Subscription;

  constructor(private route: ActivatedRoute, private cocktailsSvc: CocktailsService) { }

  ngOnInit() {
    this.route.params.subscribe(event => {
      const cocktailSource$ = this.cocktailsSvc.getCocktailById(event.id);
      this.cocktailSubscription = cocktailSource$.subscribe(cocktail => {
        this.cocktail = cocktail;
      });
    });

  }

  get image () {
    if (this.cocktail) {
      return `url(//${this.cocktail.strDrinkThumb})`;
    }
  }

  get ingredients () {
    return Object.keys(this.cocktail || {})
      .filter(key => key.includes('strIngredient'))
      .map(key => this.cocktail[key])
      .filter(item => item);
  }

  getIngredientImg (i) {
    return `//www.thecocktaildb.com/images/ingredients/${i}-Small.png`;
  }
}
