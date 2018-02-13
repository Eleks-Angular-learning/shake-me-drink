import {ShakePages} from './shake.pages';
import {ShakeCore} from './shake.core';
import {HeaderCO} from '../pages/components/header.co';

const shakeCore: ShakeCore = new ShakeCore();
const pages: ShakePages = new ShakePages(shakeCore);
const headerCO: HeaderCO = new HeaderCO(shakeCore);
const browser = this.shakeCore.browser;

const setupUI = async (login: boolean = true): Promise<void> => {
  await browser.manage().deleteAllCookies();
  browser.waitForAngularEnabled(false);
  await browser.get('/');
  if (login) {
    const loginPO = pages.getPage('loginPO');
    await loginPO.login();
  }
  browser.waitForAngularEnabled(true);
};

export {pages, shakeCore, browser, setupUI, headerCO};
