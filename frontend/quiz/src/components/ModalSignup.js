import "./login.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";


class ModalSignup extends React.Component {
    constructor(props) {
      super(props);
    }
     
    handlesubmit(submitter){
        var user = document.getElementById("usernameS").value;
        var pasw = document.getElementById("passwordS").value;
        var pasw2 = document.getElementById("password2").value;
        submitter(user, pasw, pasw2);
    }

    render(){
        return  <div id="myModal" className="modal ">
          <div className="modal-content " >
                <span className="close" onClick={()=> this.props.closeModal( )}>&times;</span>
                <p>Please enter your email and password</p>
                <input  className="button top" id="usernameS" type="username" placeholder="Email"/>
                <input  className="button top below30" id="passwordS" type="password" placeholder="Password"/>
                <input  className="button top below30" id="password2" type="password" placeholder="Password again"/>
                <Link id="SingUp"   onClick={() => this.handlesubmit(this.props.signUp)}>       Signup       </Link>
                {/* to="/add"  */}
          </div>
        </div>
        
    }
}
 export default ModalSignup;