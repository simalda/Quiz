from Utility import getElementById, isVisibleById
from Page import Page
TestBtnId = "TestBtn"
PythonBtnId = "PythonBtn"
IdForVisibility = "container-main"


class MainPage(Page):

    def isVisible(self):
        return isVisibleById(self.driver, IdForVisibility)

    def testBtn(self):
        return getElementById(self.driver, TestBtnId)

    def pythonBtn(self):
        return getElementById(self.driver, PythonBtnId)

    def open(self):
        super.open("main")
