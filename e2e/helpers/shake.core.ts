import * as protractor from 'protractor';
import {WebElement} from 'selenium-webdriver';

export class ShakeCore {
  constructor(
    public browser = protractor.browser,
    public defaultWaitToAppear = 20000,
    public ec = protractor.ExpectedConditions,
    public $ = protractor.$,
    public $$ = protractor.$$,
  ) {
  }

  public getElement = async (cssLocator: string, waitToAppear: boolean = true): Promise<WebElement> => {
    const elementFound = await protractor.$(cssLocator);
    if (waitToAppear) {
      await this.toAppear(elementFound);
    }
    return elementFound;
  }

  public toAppear = async (elementToFind: protractor.ElementFinder): Promise<protractor.ElementHelper> => {
    await elementToFind.browser_.wait(
      this.ec.visibilityOf(elementToFind),
      this.defaultWaitToAppear,
      `No element found: By(css selector: '${elementToFind.elementArrayFinder_.locator_.value}')`,
    );
    return elementToFind;
  }
}
