const assert = require('assert');
const {describe, it, beforeEach, afterEach} = require('mocha')
const {Builder, By, promise, until} = require('selenium-webdriver');
const {Eyes, Target} = require('@applitools/eyes-selenium');
var ConsoleLogHandler = require('@applitools/eyes-selenium').ConsoleLogHandler;
var ApplitoolsTestResultHandler = require('../applitoolsTestHandler').ApplitoolsTestResultHandler;
promise.USE_PROMISE_MANAGER = false;

describe('Simple Test', function() {
    let driver;
    let eyes;

    beforeEach(async function() {
        eyes = new Eyes();
        eyes.setLogHandler(new ConsoleLogHandler(true));
        eyes.setApiKey("MGcko78W47lkV6nUEzVQm9RnOR2Efw2lv34gAj0aesc110");
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('Results Handler test', async function() {

        var applitoolsViewKey = 'MGcko78W47lkV6nUEzVQm9RnOR2Efw2lv34gAj0aesc110'
        let downloadPath = process.cwd()+'/downloadImages'
        var downloadDir = downloadPath

        await eyes.open(driver, 'Google Page', 'GoogleTestPage', {width: 1000, height: 700});

        await driver.get("http://the-internet.herokuapp.com/dynamic_content");

        await eyes.checkWindow("landingPage");
        // await eyes.checkWindow("second check")

        let results = await eyes.close(false);

        const handler = new ApplitoolsTestResultHandler(results, applitoolsViewKey);
        // const handler = new ApplitoolsTestResultHandler(results, applitoolsViewKey, "ProxyServerlURL", "ProxyPort");
        // const handler = new ApplitoolsTestResultHandler(results, applitoolsViewKey, "ProxyServerlURL", "ProxyPort", "ProxyServerUsername", "ProxyServerPassword");
        await handler.downloadImages(downloadDir, 'diff'); //valid types = baseline, current, diff

        let testStatus = await handler.stepStatusArray();
        console.log("My Test Status: " + testStatus);
    });
});