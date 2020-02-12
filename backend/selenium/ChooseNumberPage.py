from Utility import getElementById
from Page import Page
headerId = "header"
startTheQuizBtnId = "startButton"
numberOfQuestionsInputID = "numberOfQuestionsInput"


class ChooseNumberPage(Page):
    def Header(self):
        return getElementById(self.driver, headerId)

    def startTheQuizBtn(self):
        return getElementById(self.driver, startTheQuizBtnId)

    def numberOfQuestionsInput(self):
        return getElementById(self.driver, numberOfQuestionsInputID)

    def open(self):
        super.open("choosesNumber")
