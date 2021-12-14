import { browser } from 'protractor';
import { expect } from 'chai';
import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
import { env } from '../../config/config';
import { HomePage } from '../../src';

chai.use(chaiAsPromised);

const url = env.hostUrl;
describe('Add all products', () =>{
  const homePage = new HomePage();
  before(async () => {
    await browser.get(url)
    await homePage.addAllToCart();
  });

  it('should get all product of cart',async () => {
    expect(homePage.getTotalProducts()).to.eventually.equal(9)
  })
})