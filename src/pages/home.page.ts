import { $, $$, ElementArrayFinder, ElementFinder } from 'protractor';

export class HomePage {
  private createUserButton: ElementFinder;
  private signInButton: ElementFinder;
  private checkoutButton: ElementFinder;
  private totalCart: ElementFinder;
  private signOutButton: ElementFinder;
  private welcomeMessage: ElementFinder;
  private allProductsButton: ElementArrayFinder; 

  constructor(){
    this.createUserButton = $('.buttonSection button:nth-child(1)');
    this.signInButton = $('.buttonSection button:nth-child(2)');
    this.checkoutButton = $('.checkout-button > a');
    this.totalCart = $('div .cartDigit');
    this.signOutButton = $('.buttonSection button');
    this.signOutButton = $('.welcomeMessage');
    this.allProductsButton = $$('.productListWrapper button');
    
  }

  public async goToCreateUser(): Promise<void> {
    this.createUserButton.click();
  }
  public async goToSignIn(): Promise<void> {
    this.signInButton.click();
  }
  public async proceedToCheckout(): Promise<void> {
    this.checkoutButton.click();
  }
  public async addAllToCart(): Promise<void> {
    this.allProductsButton.each((product) => {
      product.click()
    });
  }
  public async addOneToCart(): Promise<void> {
    this.allProductsButton.first().click()
  }

  public async getTotalProducts(): Promise<string> {
    return this.totalCart.getText();
  }
  public async getWelcome(): Promise<string> {
    return this.welcomeMessage.getText();
  }
  public async signOut(): Promise<void> {
    this.signOutButton.click()
  }
}