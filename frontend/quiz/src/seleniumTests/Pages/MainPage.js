import Page from "./Page";
import { getElementById } from "./Utility";
class MainPage extends Page {
  async isVisible() {
    return super.isVisibleById("container-main");
  }
  get testBtn() {
    return getElementById(this.driver, "TestBtn");
  }
  get pythonBtn() {
    return getElementById(this.driver, "PythonBtn");
  }
  async open() {
    await super.open("main");
  }
}

export default MainPage;
