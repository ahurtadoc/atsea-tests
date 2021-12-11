import { Config } from 'protractor';

export const config: Config = {
  framework: 'mocha',
  specs: [ '../test/google.spec.js' ],
  seleniumAddress: 'http://localhost:4444/wd/hub'
};