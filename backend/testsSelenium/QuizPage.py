import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException 
import sys
sys.path.insert(0, '/home/sofya/Projects/Quiz/backend/testsSelenium/Configurations')
from AppConfigReader import AppConfigReader

class TestClass(unittest.TestCase):
    @classmethod
    def setUpClass(self):
            self.driver = webdriver.Chrome()
            self.driver.implicitly_wait(20)
            self.driver.set_page_load_timeout(20)
            self.driver.maximize_window()
            
    

    def setUp(self):        
        #self.driver.get("http://localhost:3000/")
        self.driver.get(AppConfigReader.GetWebsite())
        time.sleep(2)
   
    

    def test_AddAQuestionMovetoCorrectPage(self):
        elemLink = self.driver.find_element_by_id("addQuestion")
        elemLink.click()
        bol = self.CheckIfExist("//h1[@id='addQuestion']")
        self.assertTrue(bol,"Add question form didn't open")

    def test_ContinueButtonMovetoNextQuestion(self):
        #print("Sofa")
        elemQuestion1 = self.driver.find_element_by_id("question")
        elemButton = self.driver.find_element_by_id("ContinueButton")
        elemButton.click()
        elemQuestion2 = self.driver.find_element_by_id("question")
        self.assertNotEqual(elemQuestion1,elemQuestion2,"The question should change.")

    def test_DifferentAnswers(self):        
        flag = False
        elem = self.driver.find_elements_by_class_name("answer")
        #print(elem)
        flag = len(set(elem)) == len(elem) #?????? CHECK
        self.assertEqual(flag, True, "There are same elements in the answers list.")

    def test_PressCorrectUnswerContinueButtonAppear(self):
        pass

    def test_PressInCorrectUnswerContinueButtonNotAppear(self):
        pass
    
    #def test_PressContinueMoveToNextQuestion(self):
        #pass
    
    #def test_CorrectUnswerAppear(self):
        #pass

        
         



  


    #def tearDown(self):
        
    @classmethod
    def tearDownClass(self):
        self.driver.close()
        self.driver.quit()

    def  CheckIfExist(self, xpath):
        try:
            self.driver.find_element_by_xpath(xpath)
        except NoSuchElementException:
            return False
        return True

if __name__ == '__main__':
    unittest.main()


    

 