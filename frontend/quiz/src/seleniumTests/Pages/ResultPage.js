import Page from "./Page";
import { getElementById } from "./Utility";

class ResultPage extends Page {
  async isVisible() {
    return super.isVisibleById("resultHeader");
  }
  get startNewQuizBtn() {
    return getElementById(this.driver, "startQuizButton");
  }

  async open(path) {
    await super.open(path);
  }
}

export default ResultPage;
