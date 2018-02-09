import {BasePage} from './base.po';

const locators = {
  organizationIdInput: '#organizationID',
  userNameInput: '#username',
  passwordInput: '#password',
  loginButton: '#login'
};

const loginData = {
  organization: 'ELEKS',
  userName: 'Alex',
  password: 'AlexPassword',
};

export class LoginPage extends BasePage {
  constructor(shakeCore) {
    super(shakeCore, locators);
  }

  async login(): Promise<void> {
    const organizationIdInput = await this.getPageElement('organizationIdInput');
    const userNameInput = await this.getPageElement('userNameInput');
    const passwordInput = await this.getPageElement('passwordInput');
    const loginButton = await this.getPageElement('loginButton');

    await organizationIdInput.sendKeys(loginData['organization']);
    await userNameInput.sendKeys(loginData['userName']);
    await passwordInput.sendKeys(loginData['password']);
    await loginButton.click();
  }
}
