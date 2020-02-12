from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from Utility import getElementById, isVisibleById
from Page import Page
usernameId = "username"
passwordId = "password"
loginBtnId = "login"
singBtnId = "signUp"
enterAsGuestBtnId = "enterAsGuest"


class LogInPage(Page):
    def enterAsGuestButton(self):
        return getElementById(self.driver, enterAsGuestBtnId)

    def logInBtn(self):
        return getElementById(self.driver, loginBtnId)

    def signUpBtn(self):
        return getElementById(self.driver, singBtnId)

    def passwordInput(self):
        return getElementById(self.driver, passwordId)

    def usernameInput(self):
        return getElementById(self.driver, usernameId)
