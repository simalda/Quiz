from Utility import getElementById, isVisibleById
from Page import Page
AboutUsLinkId = "aboutUs"
addQuestionlinkId = "addQuestion"
userOnNavBarId = "user"
PythonLinkId = "Python"
statisticsLinkId = "stat"


class NavBarPage(Page):
    def AboutUsLink(self):
        return getElementById(self.driver, AboutUsLinkId)

    def AddQuestionLink(self):
        return getElementById(self.driver, addQuestionlinkId)

    def getUsername(self):
        text = (getElementById(self.driver, userOnNavBarId)).text
        return text

    def PythonLink(self):
        return getElementById(self.driver, PythonLinkId)

    def StatisticsLink(self):
        return getElementById(self.driver, statisticsLinkId)
