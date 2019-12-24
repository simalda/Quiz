import Page from "./Page";
import MainPage from "./MainPage";

class QuizPage extends Page {
  async getUsernameInputId() {
    const user = await super.getElementById("username");
    const userId = await user.getAttribute("id");
    return userId;
  }

  async firstAnswerOptionValue() {
    return await super.getElementById("answer0").value;
  }

  async firstAnswerOptionClick() {
    const btn = await super.getElementById("answer0");
    await btn.click();
    return new MainPage(this.driver);
  }
  async findElementByTextClick(text) {
    super.findElementByText(text).click();
  }
  async nextQuestionClick() {
    const btn = await super.getElementById("ContinueButton");
    await btn.click();
    return new MainPage(this.driver);
  }

  async open(path) {
    await super.open(path);
  }
}

export default QuizPage;
