import Page from "./Page";
import { getElementById } from "./Utility";

const visibilityId = "closeModal";
const username = "usernameS";
const firstPassword = "passwordS";
const secondPassword = "password2";
const signupBtnId = "SingUp";

class ModalSignupPage extends Page {
  async isVisible() {
    return await super.isVisibleById(visibilityId);
  }

  get usernameBtn() {
    return getElementById(this.driver, username);
  }
  get passwordBtn() {
    return getElementById(this.driver, firstPassword);
  }
  get password2Btn() {
    return getElementById(this.driver, secondPassword);
  }
  get signUpBtn() {
    return getElementById(this.driver, signupBtnId);
  }

  async open(path) {
    await super.open(path);
  }
}

export default ModalSignupPage;
