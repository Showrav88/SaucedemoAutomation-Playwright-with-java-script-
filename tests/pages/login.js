import LogingnObject from '../pageObjects/loginObject';

export default class Login {
  constructor(page) {
    this.page = page;
    this.locate = new LogingnObject(page);
  }
  async clickUsernameField() {
    await this.locate.usernameField.click();
  }

  async enterUsernameField(text) {
    await this.locate.usernameField.fill(text);
    // await this.waitfor(1000);
  }
  async clickPasswordField() {
    await this.locate.passwordField.click();
  }
  async enterPasswordField(text) {
    await this.locate.passwordField.fill(text);
    // await this.waitfor(1000);
  }
  async clickLoginButton() {
    await this.locate.loginButton.click();
  }
}
