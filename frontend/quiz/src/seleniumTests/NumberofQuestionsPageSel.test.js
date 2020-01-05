import LogInPage from "./Pages/LogInPage";
import MainPage from "./Pages/MainPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import DriverFactory from "./Pages/DriverFactory";

describe("Number of Questions Page", () => {
  let driver;
  let logInPage;
  let mainPage;
  let chooseNumberPage;
  beforeEach(async () => {
    let dri = new DriverFactory();
    driver = await dri.createDriverChrome();
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    await (await logInPage.enterAsGuestButton).click();
    mainPage = new MainPage(driver);
    await (await mainPage.BtnPython).click();
    chooseNumberPage = new ChooseNumberPage(driver);
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  it("check button color", async () => {
    const color = await (await chooseNumberPage.StartTheQuizBtn).getCssValue(
      "background-color"
    );
    console.log(color);
    expect(color).toEqual("rgba(125, 180, 216, 1)");
  });
});
