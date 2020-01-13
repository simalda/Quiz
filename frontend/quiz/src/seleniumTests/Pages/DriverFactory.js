import { Builder } from "selenium-webdriver";
import LogInPage from "./LogInPage";
class DriverFactory {
  async createDriverChrome() {
    let builder = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" });
    return builder.build();
  }

  async createAndOpenChrome() {
    let driver = await this.createDriverChrome();
    const logInPage = new LogInPage(driver);
    await logInPage.open();
    return driver;
  }
}

export default DriverFactory;
