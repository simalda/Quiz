import pytest
from driverFactory import DriverFactory
from NavBarPage import NavBarPage
from ChooseNumberPage import ChooseNumberPage
from AboutUsPage import AboutUsPage


driver = None


def setup_function(function):
    driverFac = DriverFactory()
    global driver
    driver = driverFac.createAndOpenChrome()


def teardown_function(function):
    # For cleanup, quit the driver
    global driver
    driver.quit()


def test_ClickOnPythonMoveToChooseNumberPage():
    global driver
    navbar = NavBarPage(driver)
    (navbar.PythonLink()).click()
    numberOfQuestions = ChooseNumberPage(driver)
    numberOfQuestionsHeader = (numberOfQuestions.Header()).text
    assert numberOfQuestionsHeader == "Python"


def test_ClickAboutUsMoveToCorrectPage():
    global driver
    navbar = NavBarPage(driver)
    (navbar.AboutUsLink()).click()
    abUs = AboutUsPage(driver)
    abUsVisible = abUs.isVisible()
    assert abUsVisible
