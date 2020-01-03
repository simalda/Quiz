import Page from "./Page";

const visibilityId = "closeModal";
const username = "usernameS";
const firstPassword = "passwordS";
const secondPassword = "password2";
const signupBtnId = "SingUp";

class ModalSignupPage extends Page {
  async isVisible() {
    return await super.isVisibleById(visibilityId);
  }

  async usernameInputValue() {
    return await super.getElementById(username).value;
  }
  async passwordInputValue() {
    return await super.getElementById(firstPassword).value;
  }

  async password2InputValue() {
    return await super.getElementById(secondPassword).value;
  }
  setUsername(value) {
    super.getElementById(username).sendKeys(value);
  }
  setPassword(value) {
    super.getElementById(firstPassword).sendKeys(value);
  }
  setPassword2(value) {
    super.getElementById(secondPassword).sendKeys(value);
  }
  async signUpClick(status) {
    await super.getElementById(signupBtnId).then(el => el.click());
  }

  async open(path) {
    await super.open(path);
  }
}

export default ModalSignupPage;
