import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { IngredientItem } from '../app.models';
import { Subscription } from 'rxjs/Subscription';
import { IMAGE_URL } from '../../config/api';
import { getRandomIntFromRange } from '../../utils/utils';

const phrases = ['Are you serious?!', 'Not enough for you?', 'I\'m delighted with your endurance...', 'I would not drink it'];

@Component({
  selector: 'app-make-cocktail',
  templateUrl: './make-cocktail.component.html',
  styleUrls: ['./make-cocktail.component.scss']
})
export class MakeCocktailComponent implements OnInit, OnDestroy {
  allIngredients: Array<IngredientItem>;
  customIngredients: Array<IngredientItem> = [];
  warning = false;
  shakeEnabled = false;
  isFulfilled = false;
  warningMessage: string;
  cocktailsSubscription: Subscription;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    const cocktailsSource$ = this.cocktailsService.getIngredients();
    this.cocktailsSubscription = cocktailsSource$.subscribe(
      (ingredients: Array<IngredientItem>) => this.allIngredients = ingredients
    );
  }

  ngOnDestroy () {
    if (this.cocktailsSubscription) {
      this.cocktailsSubscription.unsubscribe();
    }
  }

  getIngredientImg (i) {
    const {INGREDIENTS: {URL}, SIZE: {SMALL}} = IMAGE_URL;
    return `${URL}${i.strIngredient1}${SMALL}`;
  }

  addCustomIngredient (ingredient) {
    if (this.customIngredients.length < 9) {
      this.customIngredients.push(ingredient);
    } else {
      this.warning = true;
      this.warningMessage = this.randomWarningMessage;
      setTimeout(() => this.warning = false, 10000);
    }
  }

  onItemDrop ({dragData}) {
    this.addCustomIngredient(dragData);
  }

  onDoubleClick (ingredient) {
    this.addCustomIngredient(ingredient);
  }

  onReset () {
    this.customIngredients = [];
    this.warning = false;
    this.isFulfilled = false;
  }

  onShake () {
    if (this.customIngredients.length) {
      this.shakeEnabled = true;
      setTimeout(() => {
        this.shakeEnabled = false;
        this.isFulfilled = true;
      }, 5000);
    }
  }

  get randomWarningMessage () {
    return phrases[getRandomIntFromRange(0, 3)];
  }

  onScroll (e) {
    if (window.innerWidth < 500) {
      e = window.event || e;
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      document.getElementById('ingredients-bar').scrollLeft -= (delta * 60);
      e.preventDefault();
    }
  }
}
