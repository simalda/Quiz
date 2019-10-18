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
        <div className = "col-lg-12 facebook">           
        <span > <img className="image facebookImage" src={facebook}  />Login with facebook</span></div> 
        <div className="row top">
          <div className="col-lg-3"></div>
            <div className="col-lg-3 divExt padr">  
                <h3>LOGIN</h3>
                <input  className="button top" name="username" placeholder="Email"/>
                <input  className="button top below30" name="username" placeholder="Password"/>
                
           </div>
            <div className="col-lg-3 padl">
                <h3>NEW MEMBER</h3>
                <div className="text top">Why to sing in?</div>
                <div  className="text "><img className="image ViImage" src={vi}   />See your history quiz progression</div>
                <div className="text "><img className="image ViImage" src={vi}   />Be the first to know about new quizes</div>
                <div className="text "> <img className="image ViImage" src={vi}  />Add new questions</div>
                
                </div>
            <div className="col-lg-3"></div>
            </div>
        <div className="row   ">
          <div className="col-lg-3"></div>
          <div className="col-lg-3  padr divExt">
            <div className="login button ">    Login </div></div>
          <div className="col-lg-3 padl"><div className="login button">             <span>Signup</span>  </div></div>
          <div className="col-lg-3"></div>
          </div>
          </div>
          
    );
  }
}
export default LogInPage;
