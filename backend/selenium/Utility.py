from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def getElementById(driver, id, timeout=2000):
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, id)))
    return driver.find_element_by_id(id)


def isVisibleById(driver, id, timeout=5000):
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, id)))
    if element != None:
        return True
    return False


def getElementByText(driver, text, timeout=2000):
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, text)))
    return driver.find_element_by_link_text(text)


def getElementByXpath(driver, xpath, timeout=2000):
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, xpath)))
    return driver.find_element_by_xpath(xpath)
