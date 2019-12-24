import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../redux/actions";
import { signUpSubmit } from "../redux/thunkActions";

class ConnectedModalSignup extends React.Component {
  handleSubmit(submitter) {
    const user = document.getElementById("usernameS").value;
    const password = document.getElementById("passwordS").value;
    const password2 = document.getElementById("password2").value;
    submitter(user, password, password2);
  }

  render() {
    return (
      <div id="signupModal" className="modal">
        <div className="modal-content ">
          <span
            id="closeModal"
            className="close"
            onClick={() => this.props.closeModal()}
          >
            &times;
          </span>
          <p>Please enter your email and password</p>
          <input
            className="button2  "
            id="usernameS"
            type="username"
            placeholder="Email"
          />
          <input
            className="button2"
            id="passwordS"
            type="password"
            placeholder="Password"
          />
          <input
            className="button2"
            id="password2"
            type="password"
            placeholder="Password again"
          />
          <Link
            id="SingUp"
            onClick={() => this.handleSubmit(this.props.signUp)}
          >
            Signup
          </Link>
          {/* to="/add"  */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: user => {
      dispatch(closeModal(user));
    },
    signUp: (user, pass, pass2) => {
      dispatch(signUpSubmit(user, pass, pass2));
    }
  };
};

const ModalSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedModalSignup);

export default ModalSignup;
