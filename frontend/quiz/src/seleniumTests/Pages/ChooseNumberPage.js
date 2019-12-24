import Page from "./Page";
import QuizPage from "./QuizPage";

class ChooseNumberPage extends Page {
  async getHeader() {
    const c = await super.getElementById("header");
    console.log(c);
    const tex = await c.getText();
    console.log(tex);
    return tex;
  }
  async numberOfQuestionsInputValue() {
    return await super.getElementById("numberOfQuestionsInput").value;
  }

  setNumberOfQuestionsInputValue(value) {
    super.getElementById("numberOfQuestionsInput").sendKeys(value);
  }
  async getStartTheQuizBtn() {
    return await super.getElementById("startButton");
  }
  async startTheQuizBtnClick() {
    await super.getElementById("startButton").then(el => el.click());
    return new QuizPage(this.driver);
  }

  async open(path) {
    await super.open(path);
  }
}

export default ChooseNumberPage;
