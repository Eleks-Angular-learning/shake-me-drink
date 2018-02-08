import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients: any;
  isClassVisible: boolean = false;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    this.cocktailsService.getIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  onIngredientSelect () {
    this.isClassVisible = !this.isClassVisible;
  }

}
