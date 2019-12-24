import Page from "./Page";
//import Button from "./Button";
import ChooseNumberPage from "./ChooseNumberPage";

class MainPage extends Page {
  open() {
    super.open("main");
  }

  async getBtnPython() {
    return await super.getElementById("PythonBtn");
  }

  async PythonClick() {
    const el = await super.getElementById("Python");
    await el.click();
    return new ChooseNumberPage(this.driver);
  }
}

export default MainPage;
