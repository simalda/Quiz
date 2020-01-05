import { Builder } from "selenium-webdriver";
class DriverFactory {
  async createDriverChrome() {
    let builder = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" });
    return builder.build();
  }
}

export default DriverFactory;
