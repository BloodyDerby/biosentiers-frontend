import { browser, element, by } from 'protractor';

export class BiosentiersFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bio-root bio-navbar .navbar-brand')).getText();
  }
}
