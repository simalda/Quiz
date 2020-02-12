from selenium import webdriver
import pytest
from driverFactory import DriverFactory
from Flows import loginAsTestUser
from MainPage import MainPage
from ChooseNumberPage import ChooseNumberPage
from QuizPage import QuizPage
from ResultPage import ResultPage

driver = None
numberOfQuestions = "3"


def setup_function(function):
    driverFac = DriverFactory()
    global driver
    driver = driverFac.createAndOpenChrome()
    loginAsTestUser(driver)
    mainPage = MainPage(driver)
    (mainPage.testBtn()).click()
    chooseNumberPage = ChooseNumberPage(driver)
    (chooseNumberPage.numberOfQuestionsInput()).send_keys(numberOfQuestions)
    (chooseNumberPage.startTheQuizBtn()).click()


def teardown_function(function):
    # For cleanup, quit the driver
    global driver
    driver.quit()


def test_ClickingNextButtonBeforeChoosenOptionDontChangeColor():
    global driver
    quizPage = QuizPage(driver)
    color = (quizPage.nextQuestionBtn()).value_of_css_property(
        "background-color")
    (quizPage.nextQuestionBtn()).click()
    color2 = (quizPage.nextQuestionBtn()
              ).value_of_css_property("background-color")
    assert color == color2


def test_CklickingOnDifferentOptionsAreNotPermitted():
    global driver
    quizPage = QuizPage(driver)
    (quizPage.firstAnswerOptionBtn()).click()
    color = (quizPage.secondAnswerOptionBtn()
             ).value_of_css_property("background-color")
    (quizPage.secondAnswerOptionBtn()).click()
    color2 = (quizPage.secondAnswerOptionBtn()).value_of_css_property(
        "background-color")
    assert color == color2


def test_NextButtonAfterCklickOnAnswerDoChangeColor():
    global driver
    quizPage = QuizPage(driver)
    color = (quizPage.nextQuestionBtn()).value_of_css_property(
        "background-color")
    (quizPage.firstAnswerOptionBtn()).click()
    color2 = (quizPage.nextQuestionBtn()
              ).value_of_css_property("background-color")
    assert not color == color2


def test_ClickingOnCorrectAnswerSwitchToGreenColor():
    global driver
    quizPage = QuizPage(driver)
    (quizPage.correctAnswerOptionBtn()).click()
    color = (quizPage.correctAnswerOptionBtn()
             ).value_of_css_property("background-color")
    assert color == "rgba(66, 178, 103, 1)"


def test_ClickingOnInCorrectAnswerSwitchToRedColor():
    global driver
    quizPage = QuizPage(driver)
    (quizPage.incorrectAnswerOptionBtn()).click()
    color = (quizPage.incorrectAnswerOptionBtn()
             ).value_of_css_property("background-color")
    assert color == "rgba(245, 109, 109, 1)"


def test_CounterFirstQuestionIsEqualToOne():
    global driver
    quizPage = QuizPage(driver)
    counterText = quizPage.counterCurrentQuestion()
    number = counterText[0]
    assert number == "1"


def test_CounterShowsAmountOfQuestionsCorrectly():
    global driver
    quizPage = QuizPage(driver)
    counterText = quizPage.counterCurrentQuestion()
    number = counterText[len(counterText) - 1]
    assert number == "3"


def test_CounterChangesFromQuestionToQuestion():
    global driver
    quizPage = QuizPage(driver)
/*-    number1 = (quizPage.counterCurrentQuestion())[0]+

    quizPage.answerFirstOptionAndSubmit()
    number2 = (quizPage.counterCurrentQuestion())[0]
    assert int(number1) == int(number2) - 1


def test_QuizStepMoveToResultPageAfterAllQuestionsAnswered():
    global driver
    quizPage = QuizPage(driver)
    quizPage.answerFirstOptionAndSubmit()
    quizPage.answerFirstOptionAndSubmit()
    quizPage.answerFirstOptionAndSubmit()
    resultPage = ResultPage(driver)
    isVisible = resultPage.isVisible()
    assert isVisible
