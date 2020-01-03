import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import NavBarPage from "./Pages/NavBarPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import AboutUsPage from "./Pages/AboutUsPage";

describe("Nav bar links", () => {
  let driver;
  let logInPage;
  let navbar;
  beforeEach(async () => {
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    navbar = new NavBarPage(driver);
  });

  afterEach(async () => {
    await driver.close();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    await navbar.PythonClick();
    const numberOfQuestions = new ChooseNumberPage(driver);
    const numberOfQuestionsHeader = await numberOfQuestions.getHeader();
    console.log(numberOfQuestionsHeader);
    expect(numberOfQuestionsHeader).toEqual("Python");
  });
  it("click 'about Us' move to correct page", async () => {
    await navbar.AboutUsClick();
    const abUs = new AboutUsPage(driver);
    const abUsVisible = await abUs.isVisible();
    expect(abUsVisible).toBeTruthy();
  });
});
