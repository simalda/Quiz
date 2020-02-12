from Page import Page
from Utility import isVisibleById
visibilityId = "aboutUS"


class AboutUsPage(Page):
    def isVisible(self):
        return isVisibleById(self.driver, visibilityId)
