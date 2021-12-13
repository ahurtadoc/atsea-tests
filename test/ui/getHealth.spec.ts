import { browser, $ } from 'protractor';
import { expect } from 'chai';
import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const url = 'http://host.docker.internal:8080'
describe('When open main page from atsea', () => {
  beforeEach(async () => {
    await browser.get(url)
  
  });
  it('Then give welcome message',async () => {
    expect($('.headerTitle').getText()).to.eventually.equal('Welcome to the atsea shop');

    expect(browser.getTitle()).to.eventually.equal('Atsea Shop');
  })
})