from selenium import webdriver
# import LogInPage from "./LogInPage";


class DriverFactory():

    def createDriverChrome(self):
        driver = webdriver.Chrome()
        driver.implicitly_wait(10)
        return driver

    def createAndOpenChrome(self):
        driver = webdriver.Chrome()
        driver.implicitly_wait(10)
        driver.get('http://localhost:3000/')
        driver.implicitly_wait(10)
        return driver
