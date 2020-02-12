from Utility import getElementById, isVisibleById
from Page import Page


class ResultPage (Page):
    def isVisible(self):
        return isVisibleById(self.driver, "resultHeader")

    def startNewQuizBtn(self):
        return getElementById(self.driver, "startQuizButton")
