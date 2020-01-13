import LogInPage from "./Pages/LogInPage";
import MainPage from "./Pages/MainPage";
import UsableStrings from "./UsableStrings";
import NavBarPage from "./Pages/NavBarPage";
import ModalLoginPage from "./Pages/ModalLoginPage";
import ModalSignupPage from "./Pages/ModalSignupPage";
import DriverFactory from "./Pages/DriverFactory";
import * as flowLogin from "./Flows/flowLogin";

describe("Login Page", () => {
  let driver;

  beforeEach(async () => {
    let dri = new DriverFactory();
    driver = await dri.createAndOpenChrome();
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  test("Click button 'Enter as a Guest' move to main page ", async () => {
    await flowLogin.loginAsGuest(driver);
    const mainPage = new MainPage(driver);
    const result = await mainPage.isVisible();
    expect(result).toBeTruthy();
  });

  test("Login with correct user", async () => {
    await flowLogin.loginAsTestUser(driver);
    const navbar = new NavBarPage(driver);
    const outputVal = await navbar.getUsername();
    expect(outputVal).toEqual(UsableStrings.username);
  });

  test("Modal opens when login with INcorrect user", async () => {
    await flowLogin.loginAsIncorrect(driver);
    const modalLogin = new ModalLoginPage(driver);
    const isLoginModalOpen = await modalLogin.isVisible();
    expect(isLoginModalOpen).toBeTruthy();
  });

  test("Modal shows proper text when login is with INcorrect user", async () => {
    await flowLogin.loginAsIncorrect(driver);
    const modalLogin = new ModalLoginPage(driver);
    const modalText = await modalLogin.getText();
    expect(modalText).toEqual("Wrong Parameters");
  });

  test("Signup modal opens when signup clicked", async () => {
    const logInPage = new LogInPage(driver);
    await (await logInPage.signUpBtn).click();
    const signup = new ModalSignupPage(driver);
    const isModalOpen = await signup.isVisible();
    expect(isModalOpen).toBeTruthy();
  });
});
