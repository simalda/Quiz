import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import MainPage from "./Pages/MainPage";
import UsableStrings from "./UsableStrings";
import NavBarPage from "./Pages/NavBarPage";
import ModalLoginPage from "./Pages/ModalLoginPage";
import ModalSignupPage from "./Pages/ModalSignupPage";

describe("Login Page", () => {
  let driver;
  let logInPage;

  beforeEach(async () => {
    driver = await new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    await logInPage.open();
  });

  afterEach(async () => {
    try {
      await driver.close();
      await driver.quit();
    } catch (error) {
      console.log(error);
    }
  });

  test("Click button 'Enter as a Guest' move to main page ", async () => {
    await logInPage.enterAsGuestClick();
    const mainPage = new MainPage(driver);
    const result = await mainPage.isVisible();
    expect(result).toBeTruthy();
  });

  test("Login with correct user", async () => {
    logInPage.setUsername(UsableStrings.username);
    logInPage.setPassword(UsableStrings.password);
    await logInPage.logInClick();
    const navbar = new NavBarPage(driver);
    const outputVal = await navbar.getUsername();
    expect(outputVal).toEqual(UsableStrings.username);
  });

  test("Modal opens when login with INcorrect user", async () => {
    logInPage.setUsername(UsableStrings.username);
    logInPage.setPassword(UsableStrings.incorrectPassword);
    await logInPage.logInClick();
    const modalLogin = new ModalLoginPage(driver);
    const isLoginModalOpen = await modalLogin.isVisible();
    expect(isLoginModalOpen).toBeTruthy();
  });

  test("Modal shows proper text when login is with INcorrect user", async () => {
    logInPage.setUsername(UsableStrings.username);
    logInPage.setPassword(UsableStrings.incorrectPassword);
    await logInPage.logInClick();
    const modalLogin = new ModalLoginPage(driver);
    const modalText = await modalLogin.getText();
    expect(modalText).toEqual("Wrong Parameters");
  });

  test("Signup modal opens when signup clicked", async () => {
    await logInPage.signUpClick();
    const signup = new ModalSignupPage(driver);
    const isModalOpen = await signup.isVisible();
    expect(isModalOpen).toBeTruthy();
  });
});
