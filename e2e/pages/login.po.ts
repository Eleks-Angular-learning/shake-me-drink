import {BasePage} from './base.po';
import {shakeCore} from '../helpers/shake';

const locators = {
  singInButton: '[class*=github]',
  emailInput: '#login_field',
  passwordInput: '#password',
  loginButton: '[type=submit]'
};

const loginData = {
  userName: 'd3puNjQwMDFAa3VpcWEuY29t',
  password: 'cXd3ZXIxMjM0UVdFUiFxd2U',
};

export class LoginPage extends BasePage {
  constructor(shakeCore) {
    super(shakeCore, locators);
  }

  async login(): Promise<void> {
    const loginButton = await this.getPageElement('singInButton');
    await loginButton.click();
    const windows = await shakeCore.browser.getAllWindowHandles();
    await shakeCore.browser.switchTo().window(windows[1]);
    await this.loginGithub();
    await shakeCore.browser.switchTo().window(windows[0]);
  }

  async loginGithub(): Promise<void> {
    const userNameInput = await this.getPageElement('emailInput');
    const passwordInput = await this.getPageElement('passwordInput');
    const loginButton = await this.getPageElement('loginButton');

    await userNameInput.sendKeys(Buffer.from(loginData['userName'], 'base64').toString());
    await passwordInput.sendKeys(Buffer.from(loginData['password'], 'base64').toString());
    await loginButton.click();
  }
}
