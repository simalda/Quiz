import Page from "./Page";
import { getElementById } from "./Utility";
const usernameId = "username";
const passwordId = "password";
const loginBtnId = "login";
const singBtnId = "signUp";
const enterAsGuestBtnId = "enterAsGuest";
class LoginPage extends Page {
  get enterAsGuestButton() {
    return getElementById(this.driver, enterAsGuestBtnId);
  }

  get logInBtn() {
    return getElementById(this.driver, loginBtnId);
  }

  async open() {
    await super.open("http://localhost:3000/");
  }
  get signUpBtn() {
    return getElementById(this.driver, singBtnId);
  }
  get passwordInput() {
    return getElementById(this.driver, passwordId);
  }
  get usernameInput() {
    return getElementById(this.driver, usernameId);
  }
}

export default LoginPage;
