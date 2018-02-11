const BASE_URL = '//www.thecocktaildb.com/';
const API_URL = `${BASE_URL}api/json/v1/1/`;

export const IMAGE_URL = {
  INGREDIENTS: {
    URL: `${BASE_URL}images/ingredients/`
  },
  SIZE: {
    SMALL: '-Small.png',
    MEDIUM: '-Medium.png',
    LARGE: '.png'
  }
};

export const DATA_URL = {
    COCKTAILS: `${API_URL}filter.php?c=Cocktail`,
    INGREDIENTS: `${API_URL}list.php?i=list`,
    COCKTAIL_BY_ID: `${API_URL}lookup.php?i=`,
    COCKTAILS_BY_INGREDIENT: `${API_URL}filter.php?i=`
};
