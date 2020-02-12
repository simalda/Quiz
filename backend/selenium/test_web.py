from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import pytest
from driverFactory import DriverFactory

driver = None
# @pytest.fixture


def setup_function(function):
    driverFac = DriverFactory()
    global driver
    driver = driverFac.createAndOpenChrome()


def teardown_function(function):
    # For cleanup, quit the driver
    global driver
    driver.quit()


def test_local():
    global driver
    # Set up some test case data
    search_input = driver.find_element_by_id('username')
    # Send a search phrase to the input and hit the RETURN key
    search_input.send_keys('sofa')
    assert search_input.get_attribute('value') == 'sofa'
