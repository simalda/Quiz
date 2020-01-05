import Page from "./Page";
import {
  getElementById,
  findElementByText,
  getElementByXpath
} from "./Utility";

const incorrectAnswerXpath =
  "//h4[contains(text(),'Option')]/ancestor::div[contains(@id,'answer')]";
const correctAnswerXpath =
  "//h4[contains(text(),'Answer')]/ancestor::div[contains(@id,'answer')]";
const firstOptionId = "answer0";
const secondOptionId = "answer1";
const continueButtonId = "ContinueButton";
const counterId = "counterId";
class QuizPage extends Page {
  async answerFirstOptionAndSubmit() {
    await (await this.firstAnswerOptionBtn).click();
    await (await this.nextQuestionBtn).click();
  }
  get correctAnswerOptionBtn() {
    return getElementByXpath(this.driver, correctAnswerXpath);
  }

  get incorrectAnswerOptionBtn() {
    return getElementByXpath(this.driver, incorrectAnswerXpath);
  }
  get CounterCurrentQuestion() {
    return getElementById(this.driver, counterId);
    // .then(el =>      el.getText());
  }

  get firstAnswerOptionBtn() {
    return getElementById(this.driver, firstOptionId);
  }

  async findElementByTextClick(text) {
    findElementByText(text).then(el => el.click());
  }
  get nextQuestionBtn() {
    return getElementById(this.driver, continueButtonId);
  }

  async open(path) {
    await super.open(path);
  }
  get secondAnswerOptionBtn() {
    return getElementById(this.driver, secondOptionId);
  }
}

export default QuizPage;
