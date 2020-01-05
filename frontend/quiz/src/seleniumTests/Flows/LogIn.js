export default async function LogInWith(username, password) {
  await (await this.logInPage.usernameInput).sendKeys(username);
  await (await this.logInPage.usernameInput).sendKeys(password);
  await (await this.logInPage.logIn).click();
}
