from Page import Page
from Utility import getElementById, isVisibleById

visibilityId = "closeModal"
username = "usernameS"
firstPassword = "passwordS"
secondPassword = "password2"
signUpBtnId = "SingUp"


class ModalSignUpPage(Page):
    def isVisible(self):
        return isVisibleById(self.driver, visibilityId)

    def usernameBtn(self):
        return getElementById(self.driver, username)

    def passwordBtn(self):
        return getElementById(self.driver, firstPassword)

    def password2Btn(self):
        return getElementById(self.driver, secondPassword)

    def signUpBtn(self):
        return getElementById(self.driver, signUpBtnId)
