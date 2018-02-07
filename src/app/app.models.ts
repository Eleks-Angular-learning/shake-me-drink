export interface CocktailItem {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailsList {
  drinks: Array<CocktailItem>;
}
