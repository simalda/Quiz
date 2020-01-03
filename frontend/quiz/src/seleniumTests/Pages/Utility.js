import { By, until } from "selenium-webdriver";

export async function getElementById(driver, id, timeout = 2000) {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}
export async function getElementByText(driver, text, timeout = 2000) {
  const el = await driver.wait(until.elementLocated(By.text(text)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

export async function getElementByXpath(driver, xpath, timeout = 2000) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}
