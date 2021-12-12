/* eslint-disable @typescript-eslint/no-var-requires */
import { browser, Config } from 'protractor';

const chromeConfig = { browserName: 'chrome'}
const firefoxConfig = { browserName: 'firefox', 'moz:firefoxOptions':{}}

export const config: Config = {
  framework: 'mocha',
  specs: [ '../test/ui/*.js' ],
  seleniumAddress: 'http://0.0.0.0:4444',
  SELENIUM_PROMISE_MANAGER : false,
  mochaOpts:{
    reporter: 'mochawesome-screenshots',
    timeout: 5000
  },
  multiCapabilities: [chromeConfig, firefoxConfig],
  onPrepare: async () => {
    browser.manage().timeouts().implicitlyWait(0);
    await browser.waitForAngularEnabled(false);
  }
  
};