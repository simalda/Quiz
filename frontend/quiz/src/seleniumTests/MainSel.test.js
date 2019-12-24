import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
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
    mainPage = await logInPage.enterAsGuestClick();
  });

  afterEach(async () => {
    await driver.close();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    const numberOfQuestions = await mainPage.PythonClick();
    const numberOfQuestionsHeader = await numberOfQuestions.getHeader();
    console.log(numberOfQuestionsHeader);
    expect(numberOfQuestionsHeader).toEqual("Python");
  });
  it("check button color", async () => {
    const btn = await mainPage.getBtnPython();
    const color = await btn.getCssValue("background-color");
    console.log(color);
    expect(color).toEqual("rgba(125, 180, 216, 1)");
  });
});
