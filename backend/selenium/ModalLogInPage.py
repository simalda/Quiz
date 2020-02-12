from Utility import getElementById, isVisibleById
from Page import Page


class ModalLogInPage (Page):
    def closeModalBtn(self):
        return getElementById(self.driver, "close")

    def getText(self):
        return getElementById(self.driver, "modalText").text

    def isVisible(self):
        return isVisibleById(self.driver,  "close")
