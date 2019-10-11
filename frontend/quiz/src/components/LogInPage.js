import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./login.css";
import facebook from "./FACEBOOK.png";
import vi from "./CHECK.png";
 

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
  }s

  render() {
    return (
        <div>            
        <div className=" col-lg-12 facebook ">           
          <img className="image" src={facebook}   width="20" height="30"/><span >Login with facebook</span></div> 
          <div className="row top">
          <div className="col-lg-3"></div>
            <div className="col-lg-3 divExt">  
                <h3>LOGIN</h3>
                <input  className="input button top" name="username" placeholder="Email"/>
                <input  className="input button top" name="username" placeholder="Password"/>
                <div className="login button top">           
                <span> Login with facebook </span> </div>
           </div>
            <div className="col-lg-3">
                <h3>NEW MEMBER</h3>
                <div className="text top">Why to sing in?</div>
                <div  className="text "><img className="image" src={vi}   width="15" height="30"/>See your history quiz progression</div>
                <div className="text "><img className="image" src={vi}   width="15" height="30"/>Be the first to know about new quizes</div>
                <div className="text "> <img className="image" src={vi}   width="15" height="30"/>Add new questions</div>
                <div className="login button">           
                <span>Signup</span>  </div>
                </div>
            <div className="col-lg-3"></div>
            </div>
          </div>
          
    );
  }
}
export default LogInPage;
