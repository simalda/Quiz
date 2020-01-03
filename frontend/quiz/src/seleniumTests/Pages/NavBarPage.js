import Page from "./Page";
import { getElementById } from "./Utility";
class NavBarPage extends Page {
  async AboutUsClick() {
    await getElementById(this.driver, "aboutUs").then(el => el.click());
  }
  async AddQuestionClick() {
    await getElementById(this.driver, "addQuestion").then(el => el.click());
  }
  async JSClick() {
    await getElementById(this.driver, "JS").then(el => el.click());
  }
  async getUsername() {
    const text = await getElementById(this.driver, "user").then(el =>
      el.getText()
    );
    return text;
  }
  async PythonClick() {
    await getElementById(this.driver, "Python").then(el => el.click());
  }
  async StatisticsClick() {
    await getElementById(this.driver, "stat").then(el => el.click());
  }
}

export default NavBarPage;
