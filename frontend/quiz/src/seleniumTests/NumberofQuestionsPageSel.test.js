import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import MainPage from "./Pages/MainPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";

describe("Number of Questions Page", () => {
  let driver;
  let logInPage;
  let mainPage;
  let chooseNumberPage;
  beforeEach(async () => {
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    await logInPage.enterAsGuestClick();
    mainPage = new MainPage(driver);
    await mainPage.PythonClick();
    chooseNumberPage = new ChooseNumberPage(driver);
  });

  afterEach(async () => {
    await driver.close();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("check button color", async () => {
    const btn = await chooseNumberPage.getStartTheQuizBtn();
    const color = await btn.getCssValue("background-color");
    console.log(color);
    expect(color).toEqual("rgba(125, 180, 216, 1)");
  });
});
