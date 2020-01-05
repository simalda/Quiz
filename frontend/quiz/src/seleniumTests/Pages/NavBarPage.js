import Page from "./Page";
import { getElementById } from "./Utility";
class NavBarPage extends Page {
  get AboutUsLink() {
    return getElementById(this.driver, "aboutUs");
  }
  get AddQuestionLink() {
    return getElementById(this.driver, "addQuestion");
  }

  async getUsername() {
    const text = await getElementById(this.driver, "user").then(el =>
      el.getText()
    );
    return text;
  }
  get PythonLink() {
    return getElementById(this.driver, "Python");
  }
  get StatisticsLink() {
    return getElementById(this.driver, "stat");
  }
}

export default NavBarPage;
