export interface CocktailItem extends Object {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailDetails extends CocktailItem {
  strInstructions: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
}

export interface CocktailsList extends Array<Object> {
  [index: number]: CocktailItem;
}

export interface IngredientItem extends Object {
  strIngredient1: string;
}

export interface SelectedIngredients extends Array<Object> {
  [index: number]: IngredientItem;
}
