from AppConfigKeys import AppConfigKeys
from BrowserTypes import BrowserTypes

class AppConfigReader(object):
    @staticmethod
    def   GetBrowser():
        browser = AppConfigKeys.Browser
        return browser
          
    @staticmethod
    def   GetUsername():
        pass

    @staticmethod
    def   GetPassword():
        pass
    
    @staticmethod
    def   GetWebsite():
        website = AppConfigKeys.Website
        return website

    @staticmethod
    def   GetLog():
        pass