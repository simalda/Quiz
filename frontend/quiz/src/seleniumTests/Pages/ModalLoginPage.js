import { getElementById } from "./Utility";
import Element2 from "./Element";

class ModalLoginPage extends Element2 {
  get closeModalBtn() {
    return getElementById(this.driver, "close");
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
