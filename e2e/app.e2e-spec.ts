import * as shake from './helpers/shake';

const negativeSearchTexts = ['12313131', '-))*(&*^*&%%$$#$%', 'JKDHJKnsvjdgjof*(&%$#%'];
const positiveSearchTexts = ['Abbey', 'Martini', 'Soda'];
let loginPO = null;
let headerCO = null;
let searchPO = null;

describe('Test Cocktail Maker Party Maker', () => {

  beforeAll( async () => {
    loginPO = shake.pages.getPage('loginPO');
    searchPO = shake.pages.getPage('searchPO');
    headerCO = shake.headerCO;

    await shake.setupUI();
  });

  beforeEach(async () => {
    await headerCO.clickIcon('searchIcon');
  });

  afterEach(async () => {
    await headerCO.clickIcon('homeIcon');
  });

  negativeSearchTexts.forEach(text => {
    it(`Negative search: no results found for: '${text}'.`, async () => {
      const searchInput = await searchPO.getPageElement('searchInput');
      await searchInput.sendKeys(text);

      expect(await shake.$(searchPO.getLocator('nothingFoundLabel')).isPresent()).toBe(true);
      const labelNoResult = await searchPO.getPageElement('nothingFoundLabel');

      expect(await labelNoResult.getText()).toEqual('Nothing was found.');
    });
  });

  positiveSearchTexts.forEach(text => {
    it(`Positive search: results should be found for: '${text}'.`, async () => {
      const searchInput = await searchPO.getPageElement('searchInput');
      await searchInput.sendKeys(text);

      expect(await shake.$(searchPO.getLocator('appCocktail')).isPresent()).toBe(true);
    });
  });
});
