import DriverFactory from "./Pages/DriverFactory";
import MainPage from "./Pages/MainPage";
import QuizPage from "./Pages/QuizPage";
import ChooseNumberPage from "./Pages/ChooseNumberPage";
import ResultPage from "./Pages/ResultPage";
import * as flowLogin from "./Flows/flowLogin";

const numberOfQuestions = "3";

describe("QuizStep Page", () => {
  let driver;
  let quizPage;
  beforeEach(async () => {
    const driverFactory = new DriverFactory();
    driver = await driverFactory.createAndOpenChrome();
    await flowLogin.loginAsTestUser(driver);
    const mainPage = new MainPage(driver);
    await (await mainPage.testBtn).click();
    const chooseNumberPage = new ChooseNumberPage(driver);
    await (await chooseNumberPage.numberOfQuestionsInput).sendKeys(
      numberOfQuestions
    );
    await (await chooseNumberPage.startTheQuizBtn).click();
    quizPage = new QuizPage(driver);
  });

  afterEach(async () => {
    await driver.close();
    await driver.quit();
  });

  test("Clicking NextButton  before choosen option don't change color", async () => {
    const color = await (await quizPage.nextQuestionBtn).getCssValue(
      "background-color"
    );
    await (await quizPage.nextQuestionBtn).click();
    const color2 = await (await quizPage.nextQuestionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual(color2);
  });
  test("Clicking on two different options are not permitted", async () => {
    await (await quizPage.firstAnswerOptionBtn).click();
    const color = await (await quizPage.secondAnswerOptionBtn).getCssValue(
      "background-color"
    );
    await (await quizPage.secondAnswerOptionBtn).click();
    const color2 = await (await quizPage.secondAnswerOptionBtn).getCssValue(
      "background-color"
    );
    expect(color).toEqual(color2);
  });
  test("NextButton  after choosen option do change color", async () => {
    const color = await (await quizPage.nextQuestionBtn).getCssValue(
      "background-color"
    );
    (await quizPage.firstAnswerOptionBtn).click();
    const color2 = await (await quizPage.nextQuestionBtn).getCssValue(
      "background-color"
    );
    expect(color).not.toEqual(color2);
  });
  test("Clicking on correct answer switch to green color", async () => {
    await (await quizPage.correctAnswerOptionBtn).click();
    const color = await (await quizPage.correctAnswerOptionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual("rgba(66, 178, 103, 1)");
  });
  test("Clicking on incorrect answer switch to red color", async () => {
    await (await quizPage.incorrectAnswerOptionBtn).click();
    const color = await (await quizPage.incorrectAnswerOptionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual("rgba(245, 109, 109, 1)");
  });
  test("Counter first question is equal to one", async () => {
    const counterText = await (await quizPage.counterCurrentQuestion).getText();
    const number = counterText.charAt(0);
    expect(number).toEqual("1");
  });
  test("Counter shows whole number of question correctly", async () => {
    const counterText = await (await quizPage.counterCurrentQuestion).getText();
    const number = counterText.charAt(counterText.length - 1);
    expect(number).toEqual("3");
  });
  test("Counter changes from question to question", async () => {
    const number1 = (
      await (await quizPage.counterCurrentQuestion).getText()
    ).charAt(0);
    await quizPage.answerFirstOptionAndSubmit();
    const number2 = (
      await (await quizPage.counterCurrentQuestion).getText()
    ).charAt(0);
    expect(parseInt(number1, 10)).toEqual(number2 - 1);
  });
  test("QuizStep move to Result page after all questions were answered", async () => {
    await quizPage.answerFirstOptionAndSubmit();
    await quizPage.answerFirstOptionAndSubmit();
    await quizPage.answerFirstOptionAndSubmit();
    const resultPage = new ResultPage(driver);
    const isVisible = await resultPage.isVisible();
    expect(isVisible).toBeTruthy();
  });
});
