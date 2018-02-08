import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { SelectedIngredients } from '../app.models';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients: any;
  selectedIngredients: SelectedIngredients = [];
  isSelected: boolean = false;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    this.cocktailsService.getIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  toggleIngredient (event, ingredient) {
    console.log(event.currentTarget.classList)
    const isEl = this.selectedIngredients.find((el, index) => {

      if (el.strIngredient1 === ingredient.strIngredient1) {
        this.selectedIngredients.splice(index, 1);
        event.currentTarget.classList.remove('ingredient-el--selected');
        return el.strIngredient1 === ingredient.strIngredient1;
      }
    });

    if (!isEl) {
      this.selectedIngredients.push(ingredient);
      event.currentTarget.classList.add('ingredient-el--selected');
    }
  }
}
