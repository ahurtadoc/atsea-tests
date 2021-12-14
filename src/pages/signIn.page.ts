import { $, ElementFinder } from 'protractor';

export class SignInPage {
  private usernameInput: ElementFinder;
  private passwordInput: ElementFinder;
  private signInButton: ElementFinder;

  constructor(){
    this.usernameInput = $('input[type=text]');
    this.passwordInput = $('input[type=password]');
    this.signInButton = $('.loginFormButton button');
  }

  public async fillForm(username: string, password: string): Promise<void> {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
  }
  public async login(): Promise<void> {
    this.signInButton.click();
  }
}