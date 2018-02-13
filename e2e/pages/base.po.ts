import {WebElement} from 'selenium-webdriver';

export class BasePage {
  constructor(public shakeCore, public locators: object) {}

  getLocator (key: string): string {
    return this.locators[key];
  }

  async getPageElement(locatorKey: string): Promise<WebElement> {
    return this.shakeCore.getElement(this.getLocator(locatorKey));
  }
}
