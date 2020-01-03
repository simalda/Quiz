import { By, until } from "selenium-webdriver";

export default class Element2 {
  constructor(driver) {
    this.driver = driver;
  }

  async isVisibleById(id, timeout = 5000) {
    const el = await this.driver.wait(until.elementLocated(By.id(id)), timeout);
    return await this.driver.wait(until.elementIsVisible(el), timeout);
  }
}
