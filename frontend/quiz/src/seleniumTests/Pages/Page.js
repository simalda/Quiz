import { By, until } from "selenium-webdriver";

export default class Page extends Element {
  async open(path) {
    await this.driver.get(path);
  }

  async getElementById(id, timeout = 2000) {
    const el = await this.driver.wait(until.elementLocated(By.id(id)), timeout);
    return await this.driver.wait(until.elementIsVisible(el), timeout);
  }
  async getElementByText(text, timeout = 2000) {
    const el = await this.driver.wait(
      until.elementLocated(By.text(text)),
      timeout
    );
    return await this.driver.wait(until.elementIsVisible(el), timeout);
  }
}
//driver.find_elements_by_xpath("//*[contains(text(), 'My Button')]")
//   foo(){
//   fetch("google.com")
//   .then(response => JSON.parse(response))
//   .then(result=> console.log(result));
// }

// async foo2(url){
//     let response = await fetch(url);
//     let obj = await JSON.parse(response);
//     this.x += JSON.stringify(obj);
//   }
// }

// var z = new Page();
// z.x = "";

// z.foo2("google.com");
// z.foo2("yahoo.com");
