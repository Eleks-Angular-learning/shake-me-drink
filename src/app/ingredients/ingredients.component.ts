import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: any;
  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit() {
    this.cocktailsService.getIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

}
