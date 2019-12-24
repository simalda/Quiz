import Page from "./Page";
import MainPage from "./MainPage";
import NavBarPage from "./NavBarPage";
import ModalSignupPage from "./ModalSignupPage";

class LoginPage extends Page {
  async enterAsGuestClick() {
    const btn = await super.getElementById("enterAsGuest");
    await btn.click();
    return new MainPage(this.driver);
  }

  async isLoginModalOpen() {
    try {
      return await super.getElementById("loginModal");
    } catch {
      return false;
    }
  }
  async logInClick() {
    const logBtn = await super.getElementById("login");
    await logBtn.click();
    return new NavBarPage(this.driver);
  }
  async loginModalText() {
    return await super.getElementById("modalText").then(el => el.getText());
  }
  async open() {
    await super.open("http://localhost:3000/");
  }
  async getPassword() {
    return await super.getElementById("password").value;
  }
  async signUpClick() {
    await super.getElementById("signUp").then(el => el.click());
    return new ModalSignupPage(this.driver);
  }
  async setPassword(value) {
    const password = await super.getElementById("password");
    password.sendKeys(value);
  }
  async setUsername(value) {
    const user = await super.getElementById("username");
    await user.sendKeys(value);
  }
  async getUsername() {
    return await super.getElementById("username").value;
  }
}

export default LoginPage;
