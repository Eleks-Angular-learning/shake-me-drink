import {BasePage} from './base.po';

const locators = {
  searchInput: 'input[placeholder=\'Search...\']',
  nothingFoundLabel: 'h3.no-search-results',
  appCocktail: 'app-cocktail'
};

export class SearchPage extends BasePage {
  constructor(shakeCore) {
    super(shakeCore, locators);
  }
}
