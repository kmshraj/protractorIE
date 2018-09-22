import { AUTHENTICATIONTYPE, EMAILFORMAT, Login } from '../pageObjects/Login';
import { ElementFinder, WebDriver, browser, by, element, protractor } from 'protractor';
import { PASSWORDS, USERS } from '../../mc-credentials/UsersAndPass';
import { LogTraceFor } from '../util/MCLogs';
import { Menu, MENUTEXT } from '../pageObjects/MainMenu';
import { Logout } from '../pageObjects/Logout';
import { MCWait } from '../util/MCWait';
const menu: Menu = new Menu();
describe('Navigate to Login ', () => {
  beforeAll(() => {
    LogTraceFor.view('** BEFORE ALL - I AM LOGIN AS MIMECASTER **');
    browser.get('');
    LogTraceFor.view('** I AM LOGGING INTO ADCON ON INTERNET EXPLORER **');
    browser.driver.manage().deleteAllCookies();
    //browser.ignoreSynchronization = true;
  });

  afterEach(() => {
    browser.refresh();
  });

  describe('As a User, I will login succesful to my Mimecast Account: ', () => {
    // it('Should Login as a Domain Authentication', () => {
    //   Login.loginAs(USERS.ADMIN, PASSWORDS.DOMAINPWD, AUTHENTICATIONTYPE.DOMAIN);
    //   Logout.signOut();
    // });

    it('Should Login as a Cloud Authentication', () => {
      Login.loginAs(USERS.ADMINNewQA, PASSWORDS.QACLOUDPWD, AUTHENTICATIONTYPE.CLOUD);
    
    });
    it('Check the current url should contain dashboard', () => {
      expect<any>(browser.getCurrentUrl()).toEqual("https://login-qan.mimecast.com/administration/app/#/administration-dashboard");
      
    });
  });
  
  afterAll(() => {
    Logout.signOut();
  });

});

