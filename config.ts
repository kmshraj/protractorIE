import { DisplayProcessor, SpecReporter } from 'jasmine-spec-reporter';
import { Config } from 'protractor';

import SuiteInfo = jasmine.SuiteInfo;


export const config: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://login-qan.mimecast.com/u/login/?gta=administration#/login',
    capabilities: {
        //browserName: 'chrome',
    'browserName': 'internet explorer',
    'platform': 'ANY',
    'version': '11',
    'ignoreProtectedModeSettings': true,
     "javascriptEnabled": true,
    "acceptSslCerts": true,
    "allowBlockedContent": true,
    'nativeEvents': false, // have to set false to click on elements
    'unexpectedAlertBehaviour': 'accept',
    'enablePersistentHover': true,
    'disable-popup-blocking': true,
        // chromeOptions: {
        // // args: ['--headless']
        // },
        exclude: ['./tests/**/Lockbox-009.js', './tests/loginqa/Login-014.js', './tests/loginqa/Login-011.js'],
    },
    framework: 'jasmine',
    //directConnect: true,// IE doesnt work with direct connection
    specs: ['./tests/**/Login-001.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2000000,
        showColors: true,
    },
    // noGlobals: true,

     onPrepare:  () => {
        const globals = require('protractor');
        const browser = globals.browser;
        //browser.manage().window().maximize();
        browser.manage().timeouts().setScriptTimeout(11000);
        browser.manage().timeouts().implicitlyWait(10000);
        const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        const JasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new SpecReporter({
                customProcessors: [CustomProcessor],
                prefixes: { successful: ' 🍻  -> ', failed: ' 🔥  -> ' }
            }),
        );
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'TResults',
                screenshotsFolder: 'images',
                fileNameDateSuffix: true,
                cleanDestination: true,
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidate: true,
                consolidateAll: true,
            }),
        );
        jasmine.getEnv().addReporter(
            new JasmineReporters.JUnitXmlReporter({
                // JUnit
                savePath: 'TResults/junit',
                consolidateAll: false,
            }),
        );
    },

    afterLaunch: (exitCode) => {
        console.log('exit code is' + exitCode);
    },

    suites: {
        UA: [
            'tests/userAwareness/UserAwareness-001.js',
            'tests/userAwareness/UserAwareness-002.js',
            'tests/userAwareness/UserAwareness-003.js',
            'tests/userAwareness/UserAwareness-004.js',
            'tests/userAwareness/UserAwareness-005.js',
            'tests/userAwareness/UserAwareness-006.js',
            'tests/userAwareness/UserAwareness-007.js',
            'tests/userAwareness/UserAwareness-008.js',
            'tests/userAwareness/UserAwareness-009.js',
            'tests/userAwareness/UserAwareness-010.js',
        ],
        LOGIN: 'tests/login/*.js',
    },
};

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}
