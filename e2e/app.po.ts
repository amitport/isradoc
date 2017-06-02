import { browser, by, element } from 'protractor';

export class IsradocPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('id-root h1')).getText();
  }
}
