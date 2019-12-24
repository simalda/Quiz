import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import NavBarPage from "./Pages/NavBarPage";

describe("Nav bar links", () => {
  let driver;
  let logInPage;
  let navbar;
  beforeAll(async () => {
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    navbar = new NavBarPage(driver);
    // await driver.get("http://localhost:3000/");
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    const numberOfQuestions = await navbar.PythonClick();
    const numberOfQuestionsHeader = await numberOfQuestions.getHeader();
    console.log(numberOfQuestionsHeader);
    expect(numberOfQuestionsHeader).toEqual("Python");
  });
});
