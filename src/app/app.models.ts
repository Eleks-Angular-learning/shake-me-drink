export interface CocktailItem {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailDetails extends CocktailItem {
  strInstructions: string;
}

export interface CocktailsList extends Array<any> {
  [index: number]: CocktailItem;
}

export interface IngredientItem {
  strIngredient1: string;
}

export interface SelectedIngredients extends Array<any> {
  [index: number]: IngredientItem;
}

export interface Category {
  strCategory: string;
}

export interface Categories extends Array<any> {
  [index: number]: Category;
}
