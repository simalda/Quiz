import Page from "./Page";
import { getElementById } from "./Utility";
class MainPage extends Page {
  async isVisible() {
    return super.isVisibleById("container-main");
  }
  async getBtnTest() {
    return await getElementById(this.driver, "TestBtn");
  }
  async getBtnPython() {
    return await getElementById(this.driver, "PythonBtn");
  }
  async open() {
    await super.open("main");
  }
  async TestClick() {
    await getElementById(this.driver, "TestBtn").then(el => el.click());
  }
  async PythonClick() {
    await getElementById(this.driver, "PythonBtn").then(el => el.click());
  }
}

export default MainPage;
