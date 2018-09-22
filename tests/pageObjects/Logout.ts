import { ElementFinder, browser, by, element, protractor } from 'protractor';

import { LogTraceFor } from '../util/MCLogs';
import { MCWait } from '../util/MCWait';

const EC = protractor.ExpectedConditions;

export class Logout {
  static userAvatarIcon: ElementFinder = element(by.xpath('.//*[@id=\'user\']'));
  static logout: ElementFinder = element(by.buttonText('Log Out'));
  static password: ElementFinder = element(by.id('password'));

  static signOut() {
    //this.userAvatarIcon.click();
    browser.executeScript('arguments[0].click();',  this.userAvatarIcon)
    browser.executeScript('arguments[0].click();',  this.logout).then(() => {
      browser.isElementPresent(this.password);
    }).catch((e) => {
      LogTraceFor.error(e);
    });
    LogTraceFor.info('** LOGOUT TO MIMECAST **');
  }
}
