import Page from "./Page";
import { getElementById } from "./Utility";
class ChooseNumberPage extends Page {
  get Header() {
    return getElementById(this.driver, "header");
  }
  get startTheQuizBtn() {
    return getElementById(this.driver, "startButton");
  }
  get numberOfQuestionsInput() {
    return getElementById(this.driver, "numberOfQuestionsInput");
  }
  async open(path) {
    await super.open(path);
  }
}

export default ChooseNumberPage;
