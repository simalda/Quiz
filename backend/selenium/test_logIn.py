
import pytest
from driverFactory import DriverFactory
from Flows import loginAsGuest, loginAsTestUser, loginAsIncorrect
from MainPage import MainPage
from NavBarPage import NavBarPage
from ModalLogInPage import ModalLogInPage
from ModalSignUpPage import ModalSignUpPage
from LogInPage import LogInPage
from UsableStrings import *

driver = None


def setup_function(function):
    driverFac = DriverFactory()
    global driver
    driver = driverFac.createAndOpenChrome()


def teardown_function(function):
    # For cleanup, quit the driver
    global driver
    driver.quit()


def test_ClickOnEnterAsAGuestMoveToMainPage():
    global driver
    loginAsGuest(driver)
    mainPage = MainPage(driver)
    result = mainPage.isVisible()
    assert result


def test_logInWithCorrectUser():
    global driver
    loginAsTestUser(driver)
    navbar = NavBarPage(driver)
    outputVal = navbar.getUsername()
    assert outputVal == username


def test_logInWithInCorrectUser():
    global driver
    loginAsIncorrect(driver)
    modalLogin = ModalLogInPage(driver)
    isLoginModalOpen = modalLogin.isVisible()
    assert isLoginModalOpen


def test_ModalShowsProperTestWhenLogInWithInCorrectUser():
    global driver
    loginAsIncorrect(driver)
    modalLogin = ModalLogInPage(driver)
    modalText = modalLogin.getText()
    assert modalText == "Wrong Parameters"


def test_SignUpOpensSignUpModal():
    global driver
    logInPage = LogInPage(driver)
    (logInPage.signUpBtn()).click()
    signUp = ModalSignUpPage(driver)
    isModalOpen = signUp.isVisible()
    assert isModalOpen
