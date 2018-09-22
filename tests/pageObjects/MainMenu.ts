import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { MCUtils } from '../util/MCUtils';
import { MCWait } from '../util/MCWait';


export class Menu {
  searchItem: ElementFinder = element(by.css('input[class="mc-navbar-search-field form-control"]'));
  administration: ElementFinder = element(by.css('[class="mc-navbar-item is-popover-responsive-left single-item mc-popover"]'));
  mainMenu: ElementArrayFinder = element.all(by.css('span[ng-bind="menu.label"]'));
  subMenu: ElementArrayFinder = element.all(by.css('span[ng-bind="menuItem.label"]'));
  subMenuCrumb: ElementFinder = element(by.css('.mc-crumbs  div:nth-child(2) span'));
  mainMenuCrumb: ElementFinder = element(by.css('.mc-crumbs div:nth-child(1) span'));

  identity: ElementFinder = element(by.cssContainingText('li.cursor-pointer', 'Identity'));
  identityManagement: ElementFinder = element(by.css('[mc-label="$I18N_MEGA_MENU_GROUP_IDENTITY_DASHBOARD_LABEL"]'));


  constructor() {
    browser.get('');
    browser.driver.manage().deleteAllCookies();
    browser.ignoreSynchronization = true;
  }

  searchFor(menuItem: string) {
    this.searchItem.clear();
    this.searchItem.sendKeys(menuItem);
  }

  loadMenus(mainMenu: MENUTEXT, subMenu: MENUTEXT) {
    MCUtils.clickListElement(this.administration);
    this.mainMenu.filter((mainMenuElementFinder, index) => {
      return mainMenuElementFinder.getText().then((compareMainMenuText) => {
        return compareMainMenuText === mainMenu;
      });
    }).first().click();
    this.subMenu.filter((subMenuElementFinder, index) => {
      return subMenuElementFinder.getText().then((compareSubMenuText) => {
        return compareSubMenuText === subMenu;
      });
    }).first().click();
    MCWait.waitForElemetUntilVisible(this.mainMenuCrumb);
    MCWait.waitForElemetUntilVisible(this.subMenuCrumb);
    expect<any>(this.mainMenuCrumb.getText()).toBe(mainMenu);
    expect<any>(this.subMenuCrumb.getText()).toBe(subMenu);
  }
}

export enum MENUTEXT {
  ACCOUNT = 'Account',
  ARCHIVEVIEWER = 'Archive Viewer',
  MONITORING = 'Monitoring',
  IMPERSONATIONPROTECTION = 'Impersonation Protection',
  GATEWAY = 'Gateway',
  MANAGEDSENDERS = 'Managed Senders',
  SERVICES = 'Services',
  SERVICESTTPURLPROTECTION = 'URL Protection',
  ONEDRIVESYNC = 'OneDrive Sync & Recover',
  EXCHANGESYNCNRECOVER = 'Exchange Sync & Recover',
  ARCHIVE = 'Archive',
  EXPORTS = 'Exports and Updates',
  SAVEDSEARCH = 'Saved Searches',
  DISCOVERYCASE = 'Discovery Cases',
  AUDITLOGS = 'Audit Logs',
  URLPROTECTION = 'URL Protection',
  REMEDIATION = 'Threat Remediation',
  DIRECTORIES = 'Directories',
  ATTRIBUTES = 'Atrributes',
  MESSAGECENTER = 'Message Center',
  MESSAGETRACKING = 'Message Tracking',
  IDENTITY = 'Identity',
  IDMANAGEMENT = 'Identity Management',
}
