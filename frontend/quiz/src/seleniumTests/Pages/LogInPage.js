import Page from "./Page";
import { getElementById } from "./Utility";
const usernameId = "username";
const passwordId = "password";
const loginBtnId = "login";
const singBtnId = "signUp";
const enterAsGuestBtnId = "enterAsGuest";
class LoginPage extends Page {
  async enterAsGuestClick() {
    await getElementById(this.driver, enterAsGuestBtnId).then(el => el.click());
  }
  async getPassword() {
    return await getElementById(this.driver, passwordId).value;
  }
  async logInClick() {
    await getElementById(this.driver, loginBtnId).then(el => el.click());
  }
  async open() {
    await super.open("http://localhost:3000/");
  }
  async signUpClick() {
    await getElementById(this.driver, singBtnId).then(el => el.click());
  }
  async setPassword(value) {
    await getElementById(this.driver, passwordId).then(el =>
      el.sendKeys(value)
    );
  }
  async setUsername(value) {
    await getElementById(this.driver, usernameId).then(el =>
      el.sendKeys(value)
    );
  }
  async getUsername() {
    return await getElementById(this.driver, usernameId).value;
  }
}

export default LoginPage;
