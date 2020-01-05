import DriverFactory from "./Pages/DriverFactory";
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
    let dri = new DriverFactory();
    driver = await dri.createDriverChrome();
    // jest.setTimeout(30000);
    logInPage = new LogInPage(driver);
    logInPage.open("http://localhost:3000/");
    await logInPage.LogInWith(UsableStrings.username, UsableStrings.password);
    mainPage = new MainPage(driver);
    await (await mainPage.TestBtn).click();
    chooseNumberPage = new ChooseNumberPage(driver);
    await (await chooseNumberPage.NumberOfQuestionsInput).sendKeys(
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
    quizPage.nextQuestionClick();
    const color2 = await (await quizPage.nextQuestionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual(color2);
  });
  test("Clicking on two different options are not permitted", async () => {
    quizPage.firstAnswerOptionClick();
    const color = await quizPage.secondOptionBtnColor();
    quizPage.secondAnswerOptionClick();
    const color2 = await quizPage.getSecondOptionBtnColor();

    expect(color).toEqual(color2);
  });
  test("Clicking NextButton  after choosen option do change color", async () => {
    const color = await (await quizPage.getNextQuestionBtn).getCssValue(
      "background-color"
    );
    (await quizPage.firstAnswerOptionBtn).click();
    const color2 = await (await quizPage.getNextQuestionBtn).getCssValue(
      "background-color"
    );
    expect(color).not.toEqual(color2);
  });
  test("Clicking on correct answer switch to green color", async () => {
    quizPage.correctAnswerOptionClick();
    const color = await (await quizPage.getCorrectOptionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual("rgba(66, 178, 103, 1)");
  });
  test("Clicking on incorrect answer switch to red color", async () => {
    quizPage.incorrectAnswerOptionClick();
    const color = await (await quizPage.getIncorrectOptionBtn).getCssValue(
      "background-color"
    );

    expect(color).toEqual("rgba(245, 109, 109, 1)");
  });
  test("Counter first question is equal to one", async () => {
    const counterText = await (await quizPage.CounterCurrentNumber).value;
    const number = counterText.charAt(0);
    expect(number).toEqual("1");
  });
  test("Counter shows whole number of question correctly", async () => {
    const counterText = await (await quizPage.CounterCurrentNumber).value;
    const number = counterText.charAt(counterText.length - 1);
    expect(number).toEqual("3");
  });
  test("Counter changes from question to question", async () => {
    const number1 = await quizPage
      .getCounterCurrentNumber()
      .then(text => text.charAt(0));
    await quizPage.answerFirstOptionAndSubmit();
    const number2 = await quizPage
      .getCounterCurrentNumber()
      .then(text => text.charAt(0));
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
