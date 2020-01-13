import NavBarPage from "./Pages/NavBarPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import AboutUsPage from "./Pages/AboutUsPage";
import DriverFactory from "./Pages/DriverFactory";

describe("Nav bar links", () => {
  let driver;
  let navbar;
  beforeEach(async () => {
    let dri = new DriverFactory();
    driver = await dri.createAndOpenChrome();
    navbar = new NavBarPage(driver);
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  it("click on Python move to choose number of questions page", async () => {
    await (await navbar.PythonLink).click();
    const numberOfQuestions = new ChooseNumberPage(driver);
    const numberOfQuestionsHeader = await (
      await numberOfQuestions.Header
    ).getText();
    console.log(numberOfQuestionsHeader);
    expect(numberOfQuestionsHeader).toEqual("Python");
  });
  it("click 'about Us' move to correct page", async () => {
    await (await navbar.AboutUsLink).click();
    const abUs = new AboutUsPage(driver);
    const abUsVisible = await abUs.isVisible();
    expect(abUsVisible).toBeTruthy();
  });
});
