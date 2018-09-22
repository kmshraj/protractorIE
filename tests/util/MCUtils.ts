import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { Locator } from 'protractor/built/locators';
import { LogTraceFor } from '../util/MCLogs';
import { MCWait } from './MCWait';


let firstBrowserTab;
let secondBrowserTab;
let isExpanded;
const EC = protractor.ExpectedConditions;

export class MCUtils {
    static tableHeadersCheck(locator, ...headersReceived: string[]) {
        const headers = locator.map((elm) => elm.getText());
        expect<any>(headers).toEqual(headersReceived);
    }

    static getCompareElementsText(locator, eleCollection) {
        const headers = locator.map((eleCollections) => eleCollections.getText());
        expect<any>(headers).toEqual(eleCollection);
    }

    static hasClass(currentElement, classname, hasClass: boolean) {
        if (hasClass) {
            expect(currentElement.getAttribute('class') === classname).toBeTruthy();
            LogTraceFor.info("Expected class present");
        } else if (!hasClass) {
            expect(currentElement.getAttribute('class') === classname).toBeFalsy();
            LogTraceFor.info("Expected class is not present");
        } else {
            LogTraceFor.info("Please check for valid class");
        }
    }

    static hasContent(locator) {
        LogTraceFor.info('TABLE PATH: ' + locator);
        element.all(by.css(locator)).map((tableElements) => {
            return tableElements.getText();
        }).then((tableText) => {
            if (tableText) {
                LogTraceFor.info('CURRENT CONTENT TABLE: ' + tableText.toString());
            } else {
                expect(tableText).toBeGreaterThanOrEqual(1);
            }
        });
    }

    static getAllContentTable(locator, listToCheck: TABLECONTENTSTRING) {
        LogTraceFor.info('TABLE PATH: ' + locator);
        element.all(by.css(locator)).map((tableElements) => {
            return tableElements.getText();
        }).then((tableText) => {
            LogTraceFor.info(' TEXT EXPECTED BY ME: ' + listToCheck + ' TEXT ON TABLE: ' + tableText);
            expect<any>(tableText.toString()).toBe(listToCheck);
        });
    }
    static getpagecount(locator, numtocompare) {
        LogTraceFor.info('COMPARING ITEMS COUNT IN A LIST PAGE');
        browser.sleep(5000);
        const pagecount = locator.count();
        LogTraceFor.info('  EXPECTED COUNT: ' + numtocompare + ' ACTUAL COUNT: ' + pagecount);
        expect<any>(pagecount).toEqual(numtocompare);
    }
    /******************************************* */
    // This method is useful to click element which share common locator jus by passing the text and locator of the
    static clickelementinlist(locator, elementtext) {
        LogTraceFor.info("Clicking element By Text")
        locator.filter((mainMenuElementFinder, index) => {
            return mainMenuElementFinder.getText().then((compareMainMenuText) => {
                return compareMainMenuText === elementtext;
            });
        }).first().click();
    }

    /******************************************* */
    // This method to verify the texts by passing locator of the element to compare text and Expected text

    static checkTextFor(elementText, expectedText) {
        elementText.getText().then((text) => {
            expect<any>(text).toEqual(expectedText);
        });
    }

    /******************************************* */
    // This method to check is element enabled or not by supplying locator and true or false
    static verifyisEnabled(locator, isenabled) {
        locator.isEnabled().then((enabled) => {
            LogTraceFor.info('  EXPECTED ENABLED: ' + isenabled + ' ACTUAL ENABLED: ' + enabled);
            expect<any>(enabled).toBe(isenabled);
        });
    }
    /******************************************* */
    static compareAttributevalues(locator, attrbt, expvalue) {
        expect<any>(locator.getAttribute(attrbt)).toBe(expvalue);
    }
    /******************************************* */
    // This method to check is element present or not by supplying locator and true or false
    static verifyisPresent(locator, ispresent) {
        LogTraceFor.info("Checking element present" + locator);
        locator.isPresent().then((present) => {
            LogTraceFor.info("Checking is element Present" + present);
            expect<any>(present).toBe(ispresent);
        });
    }
    static comparetexts(locator, expectedtext) {
        console.log("Compare two Strings");
        locator.getText().then((text) => {
            console.log('  EXPECTED TEXT: ' + expectedtext + ' ACTUAL TEXT: ' + text);
            expect<any>(text).toEqual(expectedtext);
        });
    }

    static selectDropdown(locator, option) {
        const selector = element(by.css(locator)).element(by.css(option)).click();
    }
    static verifyMaxLengthError(locator, sendtext, error, checktext) {
        locator.sendKeys(sendtext);
        expect<any>(error.getText()).toBe(checktext);
    }

    static switchNonAngularToAngularNewTab() {
        MCWait.keepCalmAndWait(2000);
        browser.getAllWindowHandles().then((handles) => {
            const newWindowHandle = handles[1]; // this is your new window
            browser.switchTo().window(newWindowHandle).then((navigate) => {
                LogTraceFor.info("Switching to Angular page from Non Angular")
                MCWait.keepCalmAndWait(2000);
            });
        });
    }

    static scrollIntoElementandClick(scrollel: ElementFinder) {
        browser.actions().mouseMove(scrollel).perform().then((action) => {
            MCWait.keepCalmAndWait(600);
        });
        browser.executeScript("arguments[0].scrollIntoView();", scrollel).then((action) => {
            scrollel.click();
        });
    }

    static clickListElement(elm) {
        MCWait.waitForElemetUntilVisible(elm);
        elm.click().then(() => {
            // LogTraceFor.info('** CLICK ON ELEMENT TYPE: ' + elm + ' **');
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }

    static clickAnElementForList(elm, eleText) {
        elm.map((allElements) => {
            allElements.getText().then((text) => {
                if (text === eleText) {
                    browser.actions().mouseMove(allElements).perform().then((action) => {
                    });
                    // MCWait.keepCalmAndWait(400);
                    allElements.click().then(() => {
                        LogTraceFor.info('** CLICK ON ELEMENT TYPE: ' + eleText + ' **');
                    }).catch((e) => {
                        LogTraceFor.error(e);
                    })
                }
            });
        });
    }

    static closeBrowserTabs() {
        browser.getAllWindowHandles().then((handles) => {
            firstBrowserTab = handles[0];
            secondBrowserTab = handles[1];

            browser.switchTo().window(secondBrowserTab).then(() => {
                browser.close();
            }).catch((e) => {
                LogTraceFor.error(e);
            }).then(() => {
                browser.switchTo().window(firstBrowserTab).then(() => {
                    LogTraceFor.info('** SWITCHED ACTIVE WINDOWS: ' + firstBrowserTab + ' **');
                }).catch((e) => {
                    LogTraceFor.error(e);
                });
            });
        })
    }

    static getMultipleInputsFromView = (id) => {
        return element.all(by.css(id));
    };

    static async showMore(showMoreButton, hiddenElementPath) {
        isExpanded = await hiddenElementPath.isPresent();
        if (isExpanded) {
        } else {
            showMoreButton.click().then(() => {
                expect(hiddenElementPath.isPresent()).toBeFalsy();
            }).catch((e) => {
                LogTraceFor.error(e);
            });
        }
        return this;
    }

    static selectDateRange(dateRangeID, date, custom = false, initDate = 0, finalDate = 0) {
        dateRangeID.click().then(() => {
            if (custom == true) {
                // TODO: Select Custom Date Range
            } else {
                element(by.css(date)).click().then(() => {
                    //TODO: Expect
                }).catch((e) => {
                    LogTraceFor.error(e);
                });
            }
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }

    static selectCheckbox(boxToSelect) {
        for (const checkBox of boxToSelect) {
            element(by.cssContainingText('input[type="checkbox"]', checkBox)).click().then(() => {
                expect(element(by.cssContainingText('input[type="checkbox"]', checkBox)).isSelected()).toBeTruthy();
            }).catch((e) => {
                LogTraceFor.error(e);
            });
        }
    }

    static selectOptionFromDropdown(locator, option) {
        const selector = element(by.css(locator)).element(by.css(option)).click().then(() => {
            browser.waitForAngular();
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }

    static selectElementFromTable(locator, option) {
        const selector = element(by.cssContainingText(locator, option)).click().then(() => {
            browser.waitForAngular();
        }).catch((e) => {
            LogTraceFor.error(e);
        });
    }
    static selectList(locator, option) {
        const selector = element(by.css(locator)).click().then((select) => {
            element(by.css(option)).click();
        })
    }
    static rightClick(el) {
        MCWait.keepCalmAndWait(5000);
        const loc = el.getLocation();
        browser.actions().mouseMove(loc).perform();
        browser.actions().click(protractor.Button.RIGHT).perform();
        MCWait.keepCalmAndWait(2000);
    };
    /***linktext is a string of the link to click */
    /***tablerepeater is a string of the repeater by its name to click */

    static clickColumnByMatchingNameOfAnyColumn(taskName: string, tablerepeater, linktext) {

        const row = element.all(by.repeater(tablerepeater)).filter((rows) => {
            return rows.getText().then((rowtext) => {
                return rowtext.indexOf(taskName) >= 0;
            });
        }).first();
        row.element(by.linkText(linktext)).click();
    }

    static verifyCheckBoxesStatus(eleColl: ElementArrayFinder, status) {
        eleColl.each((eleCollItem) => {
            expect<any>(eleCollItem.isSelected()).toBe(status);
        });
    }

    static compareElementsTexts(eleColl: ElementArrayFinder, compareText) {
        eleColl.each((eleCollItem) => {
            browser.executeScript("arguments[0].scrollIntoView();", eleCollItem).then((action) => {
                expect<any>(eleCollItem.getText()).toBe(compareText);
            });
        });
    }

    static unSelectCheckboxes(eleColl: ElementArrayFinder) {
        eleColl.each((cogChkboxes) => {
            cogChkboxes.getAttribute('checked').then((status) => {
                if (status) {
                    cogChkboxes.click();
                }
            });
        });
    }

    static checkEleInArratCollection(eleColl: ElementArrayFinder, eleText) {
        MCWait.waitForElemetUntilVisible(eleColl.get(0));                    
        const getArrayCollection = eleColl.then((elm) => {
            const getArrayCollectionText = new Promise((resolve) => {
                eleColl.each((datColl) => {
                    MCWait.waitForElemetUntilVisible(datColl);                    
                    datColl.getText().then((datCollText) => {
                        if (datCollText.includes(eleText)) {
                            return resolve(true); // Resolve the promise when we have all the numbers in the list in the result array
                        }
                    });
                });
            });
            getArrayCollectionText.then((getArrayItemText) => {
                expect<any>(getArrayItemText).toBe(true);
            });
        });

    }

}
export enum TABLECONTENTSTRING {
    HISTORYELEMENT = "URL Protection",
}
