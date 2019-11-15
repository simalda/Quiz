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
sys.path.insert(1, '/home/sofya/Projects/Quiz/backend/testsSelenium/Configurations/AppConfigReader')
#import AppConfigReader

class TestClass(unittest.TestCase):
    STATICQUIZ=  [
      {
        "question": "q1",
        "correctAnswer": "ansq1",
        "answerOptions": ["ansq1", "a12", "a13", "a14"]
      },
      {
        "question": "q2",
        "correctAnswer": "ansq2",
        "answerOptions": ["a21", "ansq2", "a23", "a24"]
      },
      {
        "question": "q3",
        "correctAnswer": "ansq3",
        "answerOptions": ["a31", "a32", "ansq3", "a34"]
      },
      {
        "question": "q4",
        "correctAnswer": "ansq4",
        "answerOptions": ["a41", "a42", "a43", "ansq4"]
      },
      {
        "question": "q5",
        "correctAnswer": "ansq5",
        "answerOptions": ["a51", "a52", "a53", "a54"]
      },
      {
        "question": "q6",
        "correctAnswer": "ansq6",
        "answerOptions": ["ansq6", "a62", "a63", "a64"]
      },
      {
        "question": "q7",
        "correctAnswer": "ansq7",
        "answerOptions": ["a71", "ansq7", "a73", "a74"]
      },
      {
        "question": "q8",
        "correctAnswer": "ansq8",
        "answerOptions": ["a81", "a82", "ansq8", "a84"]
      }
         
    ]
    @classmethod
    def setUpClass(self):
            self.driver = webdriver.Chrome()
            self.driver.implicitly_wait(20)
            self.driver.set_page_load_timeout(20)
            self.driver.maximize_window()
            
    

    def setUp(self):        
        self.driver.get("http://localhost:3000/")
        self.driver.get(AppConfigReader.GetWebsite())
        time.sleep(2)

    def test_CorrectUnswerAppear(self):
        elemLink = self.driver.find_element_by_id("addQuestion")
        elemLink.click()
        bol = self.CheckIfExist("//h1[@id='addQuestion']")
        self.assertTrue(bol,"Add question form didn't open")
