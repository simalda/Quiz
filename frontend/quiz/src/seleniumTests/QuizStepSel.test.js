import { Builder } from "selenium-webdriver";
import LogInPage from "./Pages/LogInPage";
import UsableStrings from "./UsableStrings";
import MainPage from "./Pages/MainPage";
import QuizPage from "./Pages/QuizPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import ResultPage from "./Pages/ResultPage";

const numberOfQuestions = "3";

describe("QuizStep Page", () => {
  let driver;
  let logInPage;
  let mainPage;
  let quizPage;
  let chooseNumberPage;
  beforeEach(async () => {
    driver = new Builder()
      .usingServer()
      .withCapabilities({ browserName: "chrome" })
      .build();
    jest.setTimeout(30000);
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    await logInPage.setUsername(UsableStrings.username);
    await logInPage.setPassword(UsableStrings.password);

    await logInPage.logInClick();
    mainPage = new MainPage(driver);
    await mainPage.TestClick();
    chooseNumberPage = new ChooseNumberPage(driver);
    await chooseNumberPage.setNumberOfQuestionsInputValue(numberOfQuestions);
    await chooseNumberPage.startTheQuizBtnClick();
    quizPage = new QuizPage(driver);
  });

  afterEach(async () => {
    await driver.close();
  });
  afterAll(async () => {
    await driver.quit();
  });

  test("Clicking NextButton  before choosen option don't change color", async () => {
    const color = await quizPage.getNextQuestionBtnColor();
    quizPage.nextQuestionClick();
    const color2 = await quizPage.getNextQuestionBtnColor();

    expect(color).toEqual(color2);
  });
  test("Clicking on two different options are not permitted", async () => {
    quizPage.firstAnswerOptionClick();
    const color = await quizPage.getSecondOptionBtnColor();
    quizPage.secondAnswerOptionClick();
    const color2 = await quizPage.getSecondOptionBtnColor();

    expect(color).toEqual(color2);
  });
  test("Clicking NextButton  after choosen option do change color", async () => {
    const color = await quizPage.getNextQuestionBtnColor();
    quizPage.firstAnswerOptionClick();
    const color2 = await quizPage.getNextQuestionBtnColor();

    expect(color).not.toEqual(color2);
  });
  test("Clicking on correct answer switch to green color", async () => {
    quizPage.correctAnswerOptionClick();
    const color = await quizPage.getCorrectOptionBtnColor();

    expect(color).toEqual("rgba(66, 178, 103, 1)");
  });
  test("Clicking on incorrect answer switch to red color", async () => {
    quizPage.incorrectAnswerOptionClick();
    const color = await quizPage.getIncorrectOptionBtnColor();

    expect(color).toEqual("rgba(245, 109, 109, 1)");
  });
  test("Counter first question is equal to one", async () => {
    const counterText = await quizPage.getCounterCurrentNumber();
    const number = counterText.charAt(0);
    expect(number).toEqual("1");
  });
  test("Counter shows whole number of question correctly", async () => {
    const counterText = await quizPage.getCounterCurrentNumber();
    const number = counterText.charAt(counterText.length - 1);
    expect(number).toEqual("3");
  });
  test("Counter changes from question to question", async () => {
    const number1 = await quizPage
      .getCounterCurrentNumber()
      .then(text => text.charAt(0));
    await answerFirstOptionAndSubmit(quizPage);
    const number2 = await quizPage
      .getCounterCurrentNumber()
      .then(text => text.charAt(0));
    expect(parseInt(number1, 10)).toEqual(number2 - 1);
  });
  test("QuizStep move to Result page after all questions were answered", async () => {
    await answerFirstOptionAndSubmit(quizPage);
    await answerFirstOptionAndSubmit(quizPage);
    await answerFirstOptionAndSubmit(quizPage);
    const resultPage = new ResultPage(driver);
    const isVisible = await resultPage.isVisible();
    expect(isVisible).toBeTruthy();
  });
});
async function answerFirstOptionAndSubmit(quizPage) {
  await quizPage.firstAnswerOptionClick();
  await quizPage.nextQuestionClick();
}
