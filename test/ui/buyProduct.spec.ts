import { browser } from 'protractor';
import { expect } from 'chai';
import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
import { env } from '../../config/config';
import { CreateUserPage, HomePage, CheckOutPage} from '../../src';
import { randomUUID } from 'crypto';

chai.use(chaiAsPromised);

const url = env.hostUrl;
const username = randomUUID();
const password = randomUUID();
describe('Create user and login', () =>{
  const homePage = new HomePage();
  const createUserPage = new CreateUserPage();
  const checkoutPage = new CheckOutPage();
  before(async () => {
    await browser.get(url)
  });
  describe('Create user and go home', () => {
    before(async() => {
      await homePage.goToCreateUser();
      await createUserPage.fillForm(username, password);
      await createUserPage.createUser();
      await createUserPage.goHome();
    });

    describe('Add product to cart and proceed to checkout', () => {
      before(async () => {
        await homePage.addOneToCart();
        await homePage.proceedToCheckout();
      })

      describe('Fill credit card info and complete order', () => {
        before(async() => {
          await checkoutPage.completeBuy()
        });
        it('Then the order was completed',async () => {
          expect(checkoutPage.getOrderResult()).to.eventually.equal('You have successfully placed an order!');
        })

      })
    })
  })
})