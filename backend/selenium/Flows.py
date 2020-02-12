from LogInPage import LogInPage
from UsableStrings import *


def loginAsGuest(driver):
    logInPage = LogInPage(driver)
    (logInPage.enterAsGuestButton()).click()


def loginAsTestUser(driver):
    logInWith(driver,  username,  correctPsw)


def loginAsIncorrect(driver):
    logInWith(driver, username, incorrectPsw)


def logInWith(driver, username, password):
    logInPage = LogInPage(driver)
    (logInPage.usernameInput()).send_keys(username)
    (logInPage.passwordInput()).send_keys(password)
    (logInPage.logInBtn()).click()
