import UsableStrings from "../UsableStrings";
import LogInPage from "../Pages/LogInPage";

export async function loginAsGuest(driver) {
  const logInPage = new LogInPage(driver);
  await (await logInPage.enterAsGuestButton).click();
}
export async function loginAsTestUser(driver) {
  await logInWith(driver, UsableStrings.username, UsableStrings.password);
}
export async function loginAsIncorrect(driver) {
  await logInWith(
    driver,
    UsableStrings.username,
    UsableStrings.incorrectPassword
  );
}
async function logInWith(driver, username, password) {
  const logInPage = new LogInPage(driver);
  await (await logInPage.usernameInput).sendKeys(username);
  await (await logInPage.passwordInput).sendKeys(password);
  await (await logInPage.logInBtn).click();
}
