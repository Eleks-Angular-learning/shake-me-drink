import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { IngredientItem } from '../app.models';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Output() cocktails = new EventEmitter({});

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
      this.onGetCocktails([], null);
    } else  {
      this.selectedIngredient = ingredient.strIngredient1;
      this.cocktailsService.getDrinksByIngredient(ingredient.strIngredient1)
        .subscribe(cocktails => {
          this.onGetCocktails(cocktails, null);
        });
    }
  }

  onGetCocktails (data, category) {
    this.cocktails.emit(data, category);
  }
}
