import { browser } from 'protractor';
import { expect } from 'chai';
import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
import { env } from '../../config/config';
import { CreateUserPage, HomePage, SignInPage } from '../../src';
import { randomUUID } from 'crypto';

chai.use(chaiAsPromised);

const url = env.hostUrl;
const username = randomUUID();
const password = randomUUID();
describe('Create user and login', () =>{
  const homePage = new HomePage();
  const createUserPage = new CreateUserPage();
  const signInPage = new SignInPage();
  before(async () => {
    await browser.get(url)
  });
  describe('Go to create user and fill user form', () => {
    before(async() => {
      await homePage.goToCreateUser();
      await createUserPage.fillForm(username, password);
      await createUserPage.createUser();
    });

    describe('SignOut with created user', () => {
      before(async () => {
        await createUserPage.goHome();
        await homePage.signOut();
      });

      describe('Sign in with created user', () => {
        before(async () => {
          await signInPage.fillForm(username, password);
          await signInPage.login();
        });

        it('then user will be created',async () => {
          expect(homePage.getWelcome()).to.eventually.equal('Welcome!');
        });
      });
    
    });

  });
})