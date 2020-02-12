from Utility import getElementById, isVisibleById, getElementByText,  getElementByXpath
from Page import Page

incorrectAnswerXpath = "//h4[contains(text(),'Option')]/ancestor::div[contains(@id,'answer')]"
correctAnswerXpath = "//h4[contains(text(),'Answer')]/ancestor::div[contains(@id,'answer')]"
firstOptionId = "answer0"
secondOptionId = "answer1"
continueButtonId = "ContinueButton"
counterId = "counterId"


class QuizPage (Page):
    def answerFirstOptionAndSubmit(self):
        (self.firstAnswerOptionBtn()).click()
        (self.nextQuestionBtn()).click()

    def correctAnswerOptionBtn(self):
        return getElementByXpath(self.driver, correctAnswerXpath)

    def counterCurrentQuestion(self):
        return (getElementById(self.driver, counterId)).text

    def incorrectAnswerOptionBtn(self):
        return getElementByXpath(self.driver, incorrectAnswerXpath)

    def firstAnswerOptionBtn(self):
        return getElementById(self.driver, firstOptionId)

    def findElementByTextClick(self, text):
        (getElementByText(self.driver, text)).click()

    def nextQuestionBtn(self):
        return getElementById(self.driver, continueButtonId)

    def secondAnswerOptionBtn(self):
        return getElementById(self.driver, secondOptionId)
