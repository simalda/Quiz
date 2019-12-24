import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import MainPage from "./Pages/MainPage";

describe("Enter as a Guest", () => {
  let driver;
  let logInPage;

  beforeEach(async () => {
    driver = await new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    logInPage.open();
  });

  afterEach(async () => {
    await driver.close();
  });
  afterAll(async () => {
    await driver.quit();
  });

  test("Click button 'Enter as a Guest' move to main page ", async () => {
    await logInPage.enterAsGuestClick();
    const mainPage = new MainPage(driver);
    expect(mainPage.isVisible()).toBeTruthy();
  });

  test("Login with correct user", async () => {
    logInPage.setUsername("test5@te.com");
    logInPage.setPassword("2x");
    const navbar = await logInPage.logInClick();
    const outputVal = await navbar.getUsername();
    expect(outputVal).toEqual("test5@te.com");
  });

  test("Modal opens when login with INcorrect user", async () => {
    logInPage.setUsername("test5@te.com");
    logInPage.setPassword("2xy");
    await logInPage.logInClick();
    const isLoginModalOpen = await logInPage.isLoginModalOpen();
    expect(isLoginModalOpen).toBeTruthy();
  });

  test("Modal shows proper text when login is with INcorrect user", async () => {
    logInPage.setUsername("test5@te.com");
    logInPage.setPassword("2xy");
    await logInPage.logInClick();
    const modalText = await logInPage.loginModalText();
    expect(modalText).toEqual("Wrong Parameters");
  });

  test("Signup modal opens when signup clicked", async () => {
    const signup = await logInPage.signUpClick();
    const isModalOpen = await signup.isModalOpen();
    expect(isModalOpen).toBeTruthy();
  });
});
