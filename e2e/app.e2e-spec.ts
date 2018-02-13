import * as shake from './helpers/shake';

const searchTexts = ['12313131', '-))*(&*^*&%%$$#$%', 'JKDHJKnsvjdgjof*(&%$#%'];
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

  searchTexts.forEach(text => {
    it(`Check no results found for: '${text}'.`, async () => {
      const searchInput = await searchPO.getPageElement('searchInput');
      await searchInput.sendKeys(text);
      const labelNoResult = await searchPO.getPageElement('nothingFoundLabel');

      expect(await labelNoResult.getText()).toEqual('Nothing was found.');
    });
  });
});
