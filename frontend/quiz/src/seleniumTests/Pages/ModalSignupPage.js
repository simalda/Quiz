import Page from "./Page";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";

class ModalSignupPage extends Page {
  async isModalOpen() {
    try {
      return await super.getElementById("username");
    } catch {
      return false;
    }
  }
  async getUsernameInputId() {
    const user = await super.getElementById("username");
    const userId = await user.getAttribute("id");
    return userId;
  }

  async usernameInputValue() {
    return await super.getElementById("usernameS").value;
  }
  async passwordInputValue() {
    return await super.getElementById("passwordS").value;
  }

  async password2InputValue() {
    return await super.getElementById("password2").value;
  }
  setUsername(value) {
    super.getElementById("usernameS").sendKeys(value);
  }
  setPassword(value) {
    super.getElementById("passwordS").sendKeys(value);
  }
  setPassword2(value) {
    super.getElementById("password2").sendKeys(value);
  }
  async signUpClick(status) {
    const btn = await super.getElementById("enterAsGuest");
    await btn.click();
    if (status === true) {
      return new MainPage(this.driver);
    } else {
      return new LoginPage(this.driver);
    }
  }

  async logInClick() {
    super.getElementById("login").click();
  }

  async open(path) {
    await super.open(path);
  }
}

export default ModalSignupPage;
