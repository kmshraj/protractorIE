import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { PASSWORDS, USERS } from '../../mc-credentials/UsersAndPass';
import { LogTraceFor } from '../util/MCLogs';
import { MCUtils } from '../util/MCUtils';
import { MCWait } from '../util/MCWait';


const EC = protractor.ExpectedConditions;

export class Login {
    static username: ElementFinder = element(by.id('username'));
    static password: ElementFinder = element(by.id('password'));
    static authDropDown: ElementFinder = element(by.id('type'));
    static next: ElementFinder = element.all(by.css('form button[type="submit"]')).get(0);
    static login: ElementFinder = element(by.css('button[translate="BUTTON_LOGIN"]'));
    //static next: ElementFinder = element(by.xpath('//*[@id="ng-app"]/body/mc-login/div/div[3]/div/div[2]/div/div/div[1]/div[1]/div/div/form'));
    static loginError: ElementFinder = element(by.css('.panel-body .text-danger'));
    static loginAsDiffUser: ElementFinder = element(by.css('a[translate="LINK_LOGIN_AS_DIFFERENT_USER"]'));
    static resetCloudPassword: ElementFinder = element(by.css('a[translate="LINK_REQUEST_CLOUD_PASSWORD_RESET"]'));
    static errorMessagesBox: ElementFinder = element(by.css('div[ng-bind="appCtrl.errorMessage"]'));
    static dashboard: ElementFinder = element(by.css('[href="#/administration-dashboard"]'));
    static samlusername: ElementFinder = element(by.css('input[id="user_email"]'));
    static samlpassword: ElementFinder = element(by.css('#user_password'));
    static samlsubmit: ElementFinder = element(by.css('input[id="user_submit"]'));
    static samlcontainer: ElementFinder = element(by.css('#get-extension-container > p:nth-child(5) > button'));
    static samlapp: ElementFinder = element(by.xpath('//*[@id="apps-view-container"]/div[2]/div/div/div/div/div/a/div[1]/img'));


    static setUser(user) {
        LogTraceFor.info('** USER TO LOGIN: ' + user + ' **');
        this.username.clear()
        this.username.sendKeys(user).then(() => {
            this.next.isEnabled().then((enabled) => {
                if (enabled) {
                    //this.next.click();
                    browser.executeScript('arguments[0].click();',  this.next)
                }  else {
                    console.log("This is an invalid user")
                }
            }).catch((e) => {
                LogTraceFor.error(e);
            });
        }).catch((e) => {
            LogTraceFor.error(e);
        })
    }

    static setPass(pass) {
        LogTraceFor.info('** PASS TO LOGIN: 💃 💃  **');
        this.password.clear()
        this.password.sendKeys(pass);
        this.next.isEnabled().then((enabled) => {
            if (enabled) {
            browser.wait(EC.elementToBeClickable(this.next), 5000);
            browser.isElementPresent(this.next);
            } else {
                console.log("This is an invalid password")
            }
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }

    static loginAs(user, pass, accountType: AUTHENTICATIONTYPE) {
        this.loginAsDifferentUser();
        this.setUser(user);
        this.password.isPresent().then ( (passpresent) => {
            if (passpresent) {
                (accountType === AUTHENTICATIONTYPE.CLOUD) ? element(by.css(AUTHENTICATIONTYPE.CLOUD)).click() : element(by.css(AUTHENTICATIONTYPE.DOMAIN)).click();
                this.setPass(pass);
                this.next.isEnabled().then((buttonenabled) => {
                    if (buttonenabled) {
                        browser.executeScript('arguments[0].click();',  this.next).then(() => {
                            browser.isElementPresent(this.dashboard);
                            }).catch((e) => {
                            LogTraceFor.error(e);
                            });
                    } else {
                        console.log("This is an invlaid password")
                    }
                }).catch((e) => {
                LogTraceFor.error(e);
                });
            } else {
            console.log("invalid user presented")
             }
        });
        return this;
    }

    static loginMultipleFailedAttempts(user, pass, accountType: AUTHENTICATIONTYPE, attp = 0) {
        if (attp < 3) {
            attp++;
            this.loginAs(user, pass, accountType);
            MCUtils.checkTextFor(this.errorMessagesBox, "Invalid user name, password or permissions.");
            LogTraceFor.info('** LOGIN FAILED ATTEMPT: ' + attp);
        }
        browser.refresh();
        this.setUser(user);
        MCUtils.checkTextFor(this.errorMessagesBox, "Invalid user name, password or permissions.");
    }

    static checkEmail(user) {
        this.username.clear()
        this.username.sendKeys(user).then(() => {
            expect<any>(this.next.isEnabled()).toBeFalsy();
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }

    static checkErrorMessagesFromLogin(user?, pass?) {
        this.setUser(user);
        this.setPass(pass);
        this.next.click().then(() => {
            MCUtils.checkTextFor(this.errorMessagesBox, "Invalid user name, password or permissions.");
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }
    static verifyErrorMessageForLogin(errorMessages: LOGINERRORMESAGE) {
        switch (errorMessages) {
            case LOGINERRORMESAGE.INVALID:
                MCUtils.checkTextFor(this.errorMessagesBox, "Invalid user name, password or permissions.");
                break;
            default:
                console.log('No valid error message found');
                break;
        }
    }
    static goToLoginAsDifferentUser() {
        this.loginAsDiffUser.click();
    }

    static loginAsDifferentUser() {
        this.loginAsDiffUser.isPresent().then((present) => {
            if (present) {
                this.loginAsDiffUser.click();
            } else {
                console.log("loginas different user link is not present here");
            }
        });
    }

    static goToResetTheCloudPass() {
        this.resetCloudPassword.click();
    }

    static loginIE(user, pass, accountType: AUTHENTICATIONTYPE) {
        this.username.sendKeys(user);
        browser.sleep(5000)
        browser.executeScript('arguments[0].click();',  this.next)
        //this.next.click();
        browser.sleep(5000)
        this.password.sendKeys(pass);
        browser.sleep(5000)
        browser.executeScript('arguments[0].click();',  this.next).then(()=>{
            browser.isElementPresent(this.dashboard);
        })
        //this.login.click();
        browser.sleep(5000)
        console.log("login done sucessfully on IE")


    }

}

export enum AUTHENTICATIONTYPE {
    DOMAIN = 'option[label="Domain"]',
    CLOUD = 'option[label="Cloud"]',
}

export enum EMAILFORMAT {
    WHITESPACES = '                     ',
    NODOMAIN = 'IAmAWrongEmailWithoutDomain',
    EMOJI = '🤓🤓🤓🤓🤓🤓🤓',
    CAPITAL = 'AAAAAAAÆ',
}

export enum LOGINERRORMESAGE {
    WHITESPACES = '             ',
    NODOMAIN = 'IAmAWrongEmailWithoutDomain',
    INVALID = 'Invalid user name, password or permissions.',
    SAMLERROR = 'Invalid username or password',

}
export enum OTHERLINK {
    SAMLLINK = 'https://mimeqa.onelogin.com/login',
    ADCONLINK = 'https://dev-sl-1.dev.mimecast.lan:19045/u/login/?gta=administration#/login',

}