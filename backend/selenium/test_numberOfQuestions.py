import pytest
from driverFactory import DriverFactory
from Flows import loginAsGuest
from MainPage import MainPage
from ChooseNumberPage import ChooseNumberPage

driver = None


def setup_function(function):
    driverFac = DriverFactory()
    global driver
    driver = driverFac.createAndOpenChrome()
    loginAsGuest(driver)
    mainPage = MainPage(driver)
    (mainPage.pythonBtn()).click()


def teardown_function(function):
    # For cleanup, quit the driver
    global driver
    driver.quit()


def test_CheckButtonColor():
    chooseNumberPage = ChooseNumberPage(driver)
    color = (chooseNumberPage.startTheQuizBtn()
             ).value_of_css_property("background-color")
    assert color == "rgba(125, 180, 216, 1)"
