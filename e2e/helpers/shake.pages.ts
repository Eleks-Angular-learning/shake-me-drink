import {LoginPage} from '../pages/login.po';
import {SearchPage} from '../pages/search.po';

export class ShakePages {
  constructor(private shakeCore) {
  }

  private pages = {
    loginPO: new LoginPage(this.shakeCore),
    searchPO: new SearchPage(this.shakeCore)
  };

  public getPage (pageKey: string) {
    return this.pages[pageKey];
  }
}
