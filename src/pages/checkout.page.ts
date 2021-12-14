import { $, ElementFinder } from 'protractor';

export class CheckOutPage {
  private completeOrderButton: ElementFinder;
  private successMessage: ElementFinder;

  constructor(){
    this.completeOrderButton = $('button[type=submit]');
    this.successMessage = $('.successMessage');
  }

  public async completeBuy(): Promise<void> {
    this.completeOrderButton.click();
  }
  public async getOrderResult(): Promise<string> {
    return this.successMessage.getText();
  }
}