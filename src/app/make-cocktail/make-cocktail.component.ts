import { Component, OnInit } from '@angular/core';
import {CocktailsService} from '../../services/cocktails.service';
import {IngredientItem} from '../app.models';

const phrases = ['Are you serious?!', 'Not enough for you?', 'I\'m delighted with your endurance...', 'I would not drink it'];

@Component({
  selector: 'app-make-cocktail',
  templateUrl: './make-cocktail.component.html',
  styleUrls: ['./make-cocktail.component.scss']
})
export class MakeCocktailComponent implements OnInit {
  allIngredients: Array<IngredientItem>;
  customIngredients: Array<IngredientItem> = [];
  warning = false;
  shakeEnabled = false;
  warningMessage: string;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    this.cocktailsService.getIngredients()
      .subscribe((ingredients: Array<IngredientItem>) => this.allIngredients = ingredients);
  }

  getIngredientImg (i) {
    return `//www.thecocktaildb.com/images/ingredients/${i.strIngredient1}-Small.png`;
  }

  addCustomIngredient (ingredient) {
    if (this.customIngredients.length < 9) {
      this.customIngredients.push(ingredient);
    } else {
      this.warning = true;
      this.warningMessage = this.getMotivatedMessage();
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
  }

  onShake () {
    if (this.customIngredients.length) {
      this.shakeEnabled = true;
      setTimeout(() => {
        this.shakeEnabled = false;
      }, 5000);
    }
  }

  getMotivatedMessage () {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return phrases[getRandomInt(0, 3)];
  }

  onScroll (e) {
    if (window.innerWidth < 500) {
      e = window.event || e;
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      document.getElementById('ingredients-bar').scrollLeft -= (delta * 60); // Multiplied by 40
      e.preventDefault();
    }
  }
}
