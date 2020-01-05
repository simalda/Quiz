import Element2 from "./Element";

class Page extends Element2 {
  async open(path) {
    await this.driver.get(path);
  }
}
export default Page;
