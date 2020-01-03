import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import MainPage from "./Pages/MainPage";

describe("Main Page", () => {
  let driver;
  let logInPage;
  let mainPage;
  beforeEach(async () => {
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    await logInPage.enterAsGuestClick();
    mainPage = new MainPage(driver);
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    await mainPage.PythonClick();
    const numberOfQuestions = new ChooseNumberPage(driver);
    const numberOfQuestionsHeader = await numberOfQuestions.getHeader();
    expect(numberOfQuestionsHeader).toEqual("Python");
  });
  it("check button color", async () => {
    const btn = await mainPage.getBtnPython();
    const color = await btn.getCssValue("background-color");
    expect(color).toEqual("rgba(125, 180, 216, 1)");
  });
});
