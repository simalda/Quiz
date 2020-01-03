import Page from "./Page";
import { getElementById } from "./Utility";
class ChooseNumberPage extends Page {
  async getHeader() {
    return await getElementById(this.driver, "header").then(el => el.getText());
  }
  async getStartTheQuizBtn() {
    return await getElementById(this.driver, "startButton");
  }
  async numberOfQuestionsInputValue() {
    return await getElementById(this.driver, "numberOfQuestionsInput").value;
  }
  async open(path) {
    await super.open(path);
  }
  async setNumberOfQuestionsInputValue(value) {
    await getElementById(this.driver, "numberOfQuestionsInput").then(el =>
      el.sendKeys(value)
    );
  }

  async startTheQuizBtnClick() {
    await getElementById(this.driver, "startButton").then(el => el.click());
  }
}

export default ChooseNumberPage;
