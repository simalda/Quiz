import { Builder, By, until } from "selenium-webdriver";

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe("webdriver", () => {
  let driver;

  beforeAll(async () => {
    // const options = new chrome.Options();
    // options.headless();
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();

    // eslint-disable-next-line no-undef
    await driver.get("http://localhost:3000/");
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("test", async () => {
    const btn = await getElementById(driver, "enterAsGuest");
    await btn.click();

    const output = await getElementById(driver, "langDiv");
    const outputVal = await output.getAttribute("class");

    expect(outputVal).toEqual("gridMain");
  });

  it("test2", async () => {
    const btn = await getElementById(driver, "Python");
    await btn.click();

    const output = await getElementById(driver, "numberOfQuestionsInput");
    const outputVal = await output.getAttribute("class");

    expect(outputVal).toEqual("chooseNumberInput");
  });
});
