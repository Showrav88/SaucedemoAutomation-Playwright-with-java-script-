export default class LogingnObject {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('//input[@name="user-name"]');
    this.passwordField = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//input[@id="login-button"]');
  }
}
