export class BasePage {
  constructor(public shakeCore, public locators: object) {}

  getLocator (key: string): Promise<string> {
    return this.locators[key];
  }

  async getPageElement(locatorKey: string): Promise<any> {
    return this.shakeCore.getElement(this.getLocator(locatorKey));
  }
}
