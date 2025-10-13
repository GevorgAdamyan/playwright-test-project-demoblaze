import { LOGIN } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  private readonly usernameInput: string = '#loginusername';
  private readonly passwordInput: string = '#loginpassword';
  private readonly loginButton: string = '[onclick="logIn()"]';

  async login(username: string, password: string): Promise<void> {
    await this.typeText(this.usernameInput, username);
    await this.typeText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForResponse(POST, LOGIN);
  }
}
