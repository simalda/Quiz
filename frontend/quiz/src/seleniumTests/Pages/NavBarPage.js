import Page from "./Page";
import AboutUsPage from "./AboutUsPage";
import Button from "./Button";
import StatisticsPage from "./StatisticsPage";
import AddQuestionPage from "./AddQuestionPage";
import ChooseNumberPage from "./ChooseNumberPage";

class NavBarPage extends Page {
  async getUsername() {
    const c = await super.getElementById("user");
    const text = await c.getText();
    return text;
  }
  async AboutUsClick() {
    const btn = await super.getElementById("aboutUs");
    await btn.click();
    return new AboutUsPage(this.driver);
  }
  async StatisticsClick() {
    const btn = await super.getElementById("stat");
    await btn.click();
    return new StatisticsPage(this.driver);
  }
  async AddQuestionClick() {
    const btn = await super.getElementById("addQuestion");
    await btn.click();
    return new AddQuestionPage(this.driver);
  }
  async PythonClick() {
    //return await Button.languageClick("Python");
    const el = await super.getElementById("Python");
    await el.click();
    return new ChooseNumberPage(this.driver);
  }

  async JSClick() {
    await Button.languageClick("JS");
  }
}

export default NavBarPage;
