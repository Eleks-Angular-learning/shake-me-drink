const API_URL = '//www.thecocktaildb.com/api/json/v1/1/';
export const DATA_URL = {
  COCKTAILS: `${API_URL}filter.php?c=Cocktail`,
  INGREDIENTS: `${API_URL}list.php?i=list`,
  COCKTAIL_BY_ID: `${API_URL}lookup.php?i=`,
  COCKTAILS_BY_INGREDIENT: `${API_URL}filter.php?i=`
};
