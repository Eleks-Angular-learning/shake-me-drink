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

export interface Category {
  strCategory: string;
}

export interface Categories extends Array<any> {
  [index: number]: Category;
}

export interface DataByTag {
  category: string;
  data: Categories;
}

export interface DataByTagList extends Array<any> {
  [index: number]: DataByTag;
}
