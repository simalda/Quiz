import ChooseNumberPage from "./Pages/ChooseNumberPage";
import MainPage from "./Pages/MainPage";
import DriverFactory from "./Pages/DriverFactory";
import * as flowLogin from "./Flows/flowLogin";

describe("Main Page", () => {
  let driver;
  let mainPage;
  beforeEach(async () => {
    let dri = new DriverFactory();
    driver = await dri.createAndOpenChrome();
    await flowLogin.loginAsGuest(driver);
    mainPage = new MainPage(driver);
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    await (await mainPage.pythonBtn).click();
    const numberOfQuestions = new ChooseNumberPage(driver);
    const numberOfQuestionsHeader = await (
      await numberOfQuestions.Header
    ).getText();
    expect(numberOfQuestionsHeader).toEqual("Python");
  });

  it("check button color", async () => {
    const btn = await mainPage.pythonBtn;
    const color = await btn.getCssValue("background-color");
    expect(color).toEqual("rgba(125, 180, 216, 1)");
  });
});
