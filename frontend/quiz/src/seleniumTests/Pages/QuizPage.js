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
  async correctAnswerOptionClick() {
    await getElementByXpath(this.driver, correctAnswerXpath).then(el =>
      el.click()
    );
  }
  async getCorrectOptionBtnColor() {
    return await getElementByXpath(this.driver, correctAnswerXpath).then(btn =>
      btn.getCssValue("background-color")
    );
  }
  async incorrectAnswerOptionClick() {
    await getElementByXpath(this.driver, incorrectAnswerXpath).then(el =>
      el.click()
    );
  }
  async getCounterCurrentNumber() {
    return await getElementById(this.driver, counterId).then(el =>
      el.getText()
    );
  }
  async getIncorrectOptionBtnColor() {
    return await getElementByXpath(
      this.driver,
      incorrectAnswerXpath
    ).then(btn => btn.getCssValue("background-color"));
  }
  async getFirstOptionBtnColor() {
    return await getElementById(this.driver, firstOptionId).then(btn =>
      btn.getCssValue("background-color")
    );
  }
  async getNextQuestionBtnColor() {
    return await getElementById(this.driver, continueButtonId).then(btn =>
      btn.getCssValue("background-color")
    );
  }
  async getSecondOptionBtnColor() {
    return await getElementById(this.driver, secondOptionId).then(btn =>
      btn.getCssValue("background-color")
    );
  }

  async firstAnswerOptionValue() {
    return await getElementById(this.driver, firstOptionId).value;
  }

  async firstAnswerOptionClick() {
    getElementById(this.driver, firstOptionId).then(btn => btn.click());
  }
  async findElementByTextClick(text) {
    findElementByText(text).then(el => el.click());
  }
  async nextQuestionClick() {
    await getElementById(this.driver, continueButtonId).then(btn =>
      btn.click()
    );
  }

  async open(path) {
    await super.open(path);
  }
  async secondAnswerOptionClick() {
    getElementById(this.driver, secondOptionId).then(btn => btn.click());
  }
}

export default QuizPage;
