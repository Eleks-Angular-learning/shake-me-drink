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
