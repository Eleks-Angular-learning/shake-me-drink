import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { IngredientItem } from '../app.models';
import { IMAGE_URL } from '../../config/api';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Output() cocktails = new EventEmitter();

  ingredients: Array<IngredientItem>;
  selectedIngredient = '';
  isLoading = false;

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.cocktailsService.getIngredients()
      .subscribe((ingredients: Array<IngredientItem>) => {
        this.ingredients = ingredients;
        this.isLoading = false;
      });
  }

  toggleIngredient (event, ingredient) {
    if (this.selectedIngredient === ingredient.strIngredient1) {
      this.selectedIngredient = '';
      this.onGetCocktails([]);
    } else  {
      this.selectedIngredient = ingredient.strIngredient1;
      this.cocktailsService.getDrinksByIngredient(ingredient.strIngredient1)
        .subscribe(cocktails => {
          this.onGetCocktails(cocktails);
        });
    }
  }

  getIngredientImage (i) {
    const {INGREDIENTS: {URL}, SIZE: {MEDIUM}} = IMAGE_URL;
    return `${URL}${i.strIngredient1}${MEDIUM}`;
  }

  isSelected (i) {
    return i.strIngredient1 === this.selectedIngredient;
  }

  onGetCocktails (data) {
    this.cocktails.emit(data);
  }
}
