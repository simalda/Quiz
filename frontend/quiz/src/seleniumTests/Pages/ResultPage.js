import Page from "./Page";
import ChooseNumberPage from "./ChooseNumberPage";

class ResultPage extends Page {
  async startNewQuizClick() {
    const btn = await super.getElementById("startQuizButton");
    await btn.click();
    return new ChooseNumberPage(this.driver);
  }

  async open(path) {
    await super.open(path);
  }
}

export default ResultPage;
