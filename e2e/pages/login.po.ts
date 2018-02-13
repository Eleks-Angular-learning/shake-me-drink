import {BasePage} from './base.po';
import {shakeCore} from '../helpers/shake';

const locators = {
  organizationIdInput: '#organizationID',
  userNameInput: '#username',
  passwordInput: '#password',
  loginButton: '#login',
  facebookEmail: '#email',
  facebookPassword: '#pass',
  facebookLoginButton: '#loginbutton'
};

const loginData = {
  organization: 'ELEKS',
  userName: 'conceptmaster1798@gmail.com',
  password: 'nK4AkBqRZK1i2gmVsXGz',
};

export class LoginPage extends BasePage {
  constructor(shakeCore) {
    super(shakeCore, locators);
  }

  async login(): Promise<void> {
    const loginButton = await this.getPageElement('loginButton');
    await loginButton.click();
    const windows = await shakeCore.browser.getAllWindowHandles();
    await shakeCore.browser.switchTo().window(windows[1]);
    await this.loginFacebook();
    await shakeCore.browser.switchTo().window(windows[0]);
  }

  async loginFacebook(): Promise<void> {
    const userNameInput = await this.getPageElement('facebookEmail');
    const passwordInput = await this.getPageElement('facebookPassword');
    const loginButton = await this.getPageElement('facebookLoginButton');

    await userNameInput.sendKeys(loginData['userName']);
    await passwordInput.sendKeys(loginData['password']);
    await loginButton.click();
  }
}
