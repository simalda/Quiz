import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./login.css";
import facebook from "./FACEBOOK.png";
import vi from "./CHECK.png";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";
import modalKinds from "../ModlKind";

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.autonticates = ["Login", "Singup", "Enter as Guest"];
    this.username = "";
    this.password = "";
  }

  login() {
    var user = document.getElementById("username").value;
    var pasw = document.getElementById("password").value;
    this.props.onLoginSelected(user, pasw);
  }

  createModal(modalKind) {
    if (modalKind === modalKinds.Nothing) {
      return null;
    }
    if (modalKind === modalKinds.OpenSignup) {
      return (
        <ModalSignup closeModal={() => this.props.closeModal()} signUp={(x, y,z) => this.props.signUp(x, y,z)}></ModalSignup>
      );
    }
     

    
    return (
      <ModalLogin
        closeModal={() => this.props.closeModal()}
        text={modalKind}
      />
    );
  }

  render() {
    let modal = this.createModal(this.props.modal);

    return (
      <div>
        <div
          className="col-lg-12  facebook top60"
          onClick={() => this.props.onEnterAsaGuestSelected()}
        >
          <span> LOGIN AS GUEST</span>
        </div>
        <div className="row top60">
          <div className="col-lg-3"></div>
          <div className="col-lg-3 divExt padr">
            <h3>LOGIN</h3>
            <input
              className="button top"
              id="username"
              type="username"
              placeholder="Email"
            />
            <input
              className="button top below30"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="col-lg-3 padl">
            <h3>NEW MEMBER</h3>
            <div className="text top">Why to sing in?</div>
            <div className="text ">
              <img className="image ViImage" src={vi} />
              See your history quiz progression
            </div>
            <div className="text ">
              <img className="image ViImage" src={vi} />
              Be the first to know about new quizes
            </div>
            <div className="text ">
              <img className="image ViImage" src={vi} />
              Add new questions
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
        <div className="row   ">
          <div className="col-lg-3"></div>
          <div className="col-lg-3  padr divExt">
            <div className="login button" onClick={() => this.login()}>
              Login
            </div>
          </div>
          <div className="col-lg-3 padl">
            <div
              className="login button"
              onClick={() => this.props.onSignupSelected()}
              
            >
              <span>Signup</span>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
        {modal}
      </div>
    );
  }
}
export default LogInPage;
