import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./login.css";
import ContinueButton from "./ContinueButton";

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.autonticates = ["Login", "Singup", "Enter as Guest"];
    this.username = "";
    this.password = "";
  }

  handlesubmit(submitter, autonticate) {
    submitter(autonticate);
  }

  onAunticateSelected(autonticate) {
    if (autonticate === "Login") {
    } else if (autonticate === "Singup") {
    } else if (autonticate === "Enter as Guest") {
      this.props.setState({
        ...this.props.state,
        page: 0
      });
    }
  }

  produceAutonticates(autonticates) {
    return autonticates.map(autonticate => (
      <div
        key={autonticate}
        className="answer"
        onClick={() => this.handlesubmit(this.onAunticateSelected, autonticate)}
      >
        <h4>{autonticate}</h4>
      </div>
    ));
  }

  render() {
    return (
      <form >
          <div className="answer hov">
        <h3>Log in</h3>
        <div className="log" data-validate="Please enter username">
          <input
            
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>

        <div className="log" data-validate="Please enter password">
          <input
            
            type="password"
            name="pass"
            placeholder="Password"
          />
        </div>
        </div>
        <div className="log">
        <ContinueButton nextTurn={() => this.continueButtonClicked()} />
        </div>

        <div className="log guest">
          <span className = "guest">Don’t have an account?</span>

          <a href="#" >
            Sign up now
          </a>
        </div>
        <div className="log ">
          <span className = "guest">Don’t want to have an account?</span>

          <a href="#" >
            Enter as guest
          </a>
        </div>
      </form>
    );
  }
}
export default LogInPage;
