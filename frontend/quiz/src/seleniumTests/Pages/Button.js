import Page from "./Page";
import ChooseNumberPage from "./ChooseNumberPage";

class Button extends Page {
  static async languageClick(lang) {
    console.log(lang);
    const el = await super.getElementById("Python");
    console.log(el);
    await el.click();
    return new ChooseNumberPage(this.driver);
  }
}
export default Button;
