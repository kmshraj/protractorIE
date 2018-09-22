import { browser, by, element, ElementFinder, protractor } from 'protractor';


const EC = protractor.ExpectedConditions;

export class MCWait {
    static forElement(elementToWait: ElementFinder) {
        console.log('I am waiting for an element named: ' + elementToWait);
        return browser.wait(EC.elementToBeClickable(elementToWait), 5000);
    }

    static keepCalmAndWait(time = 2000) {
        return browser.sleep(time);
    };

    static waitForElemetUntilVisible(elementToWait: ElementFinder) {
       var elemVisibleStatus = browser.wait(EC.visibilityOf(elementToWait), 50000, "WAIT TO APPEAR ELEMENT");
       elemVisibleStatus.then((elmVisible)=> { 
            if (elmVisible == true){
                return true;
            }
            else {
                this.waitForElemetUntilVisible(elementToWait);
            }
       });
    }

    static waitForElemetUntilInvisible(elementToWait: ElementFinder) {
        return browser.wait(EC.not(EC.visibilityOf(elementToWait)), 50000, 'WAIT TO DISSAPEAR ELEMENT');
    }

}
