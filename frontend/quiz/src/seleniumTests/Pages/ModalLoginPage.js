import { getElementById } from "./Utility";
import Element2 from "./Element";

class ModalLoginPage extends Element2 {
  async closeModal() {
    await getElementById(this.driver, "close").then(el => el.click());
  }
  async getText() {
    return await getElementById(this.driver, "modalText").then(el =>
      el.getText()
    );
  }
  async isVisible() {
    return super.isVisibleById("close");
  }
}

export default ModalLoginPage;
