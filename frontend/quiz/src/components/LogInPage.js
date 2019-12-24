import React from "react";

import { connect } from "react-redux";
import { login } from "../redux/thunkActions";
import { setGuestUser, signUp } from "../redux/actions";
import { Link } from "react-router-dom";

import vi from "../images/CHECK.png";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";
import modalKinds from "../JS/ModalKind";

class ConnectedLogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.authenticates = ["Login", "SingUp", "Enter as Guest"];
    this.username = "";
    this.password = "";
  }

  createModal(modalKind) {
    if (modalKind === modalKinds.Nothing) {
      return null;
    }
    if (modalKind === modalKinds.OpenSignup) {
      return (
        <ModalSignup
          closeModal={() => this.props.closeModal()}
          signUp={(x, y, z) => this.props.signUp(x, y, z)}
        ></ModalSignup>
      );
    }

    return (
      <ModalLogin closeModal={() => this.props.closeModal()} text={modalKind} />
    );
  }
  doLogin() {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    this.props.login(user, password);
  }

  render() {
    let modal = this.createModal(this.props.modal);
    let input;
    if (this.props.user !== "guest") {
      input = (
        <input
          id="username"
          className="button"
          type="username"
          placeholder="Email"
          value={this.props.user}
        />
      );
    } else {
      input = (
        <input
          id="username"
          className="button"
          type="username"
          placeholder="Email"
          // value={this.username}
        />
      );
    }
    return (
      <div>
        <div id="grid-container">
          <Link
            to="/main"
            id="enterAsGuest"
            onClick={() => this.props.onEnterAsaGuestSelected()}
          >
            <span id="guest">LOGIN AS GUEST</span>
          </Link>
          <div className="divExt"></div>
          <h3 id="login-text">LOGIN</h3>
          <h3 id="newMember-text"> NEW MEMBER</h3>
          {input}
          <div id="text">
            <div className="text2 ">Why to sing in?</div>
            <div className="text2 ">
              <img alt="" className="image ViImage" src={vi} />
              See your history quiz progression
            </div>
            <div className="text2 ">
              <img alt="" className="image ViImage" src={vi} />
              Be the first to know about new quizzes
            </div>
            <div className="text2 ">
              <img alt="" className="image ViImage" src={vi} />
              Add new questions
            </div>
          </div>
          <input
            className="button"
            id="password"
            type="password"
            placeholder="Password"
          />
          <div
            id="login"
            className="login button"
            onClick={() => this.doLogin()}
          >
            Login
          </div>
          <div
            id="signUp"
            className="login button"
            onClick={() => this.props.onSignupSelected()}
          >
            Signup
          </div>
        </div>

        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    modal: state.userReducer.modal,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user, password) => {
      dispatch(login(user, password));
    },
    onEnterAsaGuestSelected: () => {
      dispatch(setGuestUser("guest"));
    },
    onSignupSelected: () => {
      dispatch(signUp());
    }
  };
};

const LogInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLogInPage);

export default LogInPage;
