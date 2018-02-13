import {WebElement} from 'selenium-webdriver';

const locators = {
  homeIcon: 'span.glyphicon.glyphicon-home',
  searchIcon: 'span.glyphicon.glyphicon-search',
  glassIcon: 'span.glyphicon.glyphicon-glass',
  logoutIcon: 'span.glyphicon.glyphicon-log-out',
};

export class HeaderCO {
  constructor(private shakeCore) { }

  getLocator (key: string): string {
    return locators[key];
  }

  async getComponentElement(locatorKey: string): Promise<WebElement> {
    return this.shakeCore.getElement(this.getLocator(locatorKey));
  }

  async clickIcon(locatorKey: string): Promise<any> {
    return (await this.getComponentElement(locatorKey)).click();
  }
}
