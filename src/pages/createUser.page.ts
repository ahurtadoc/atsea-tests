import { $, ElementFinder } from 'protractor';

export class CreateUserPage {
  private usernameInput: ElementFinder;
  private passwordInput: ElementFinder;
  private signUpButton: ElementFinder;
  private onSuccess: ElementFinder;
  private backToApp: ElementFinder;

  constructor(){
    this.usernameInput = $('input[type=text]');
    this.passwordInput = $('input[type=password]');
    this.signUpButton = $('.createFormButton button');
    this.onSuccess = $('.successMessage');
    this.backToApp = $('.successButton button');
  }

  public async fillForm(username: string, password: string): Promise<void> {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
  }
  public async createUser(): Promise<void> {
    this.signUpButton.click();
  }
  public async getResult(): Promise<string> {
    return this.onSuccess.getText();
  }
  public async goHome(): Promise<void> {
    this.backToApp.click();
  }
}