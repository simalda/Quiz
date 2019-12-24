import { By, until } from "selenium-webdriver";

export default class Element {
  constructor(driver) {
    this.driver = driver;
  }

  async isVisibleById(id, timeout = 2000) {
    const el = await this.driver.wait(until.elementLocated(By.id(id)), timeout);
    return await this.driver.wait(until.elementIsVisible(el), timeout);
  }
}
