 
import React, { Component } from "react";
import ReactDOM from "react-dom";


class ModalLogin extends React.Component {
    constructor(props) {
      super(props);
    }
     
    render(){
        return  <div id="myModal" className="modal ">
          <div className="modal-content button"  >
            <span className="close" onClick={()=> this.props.closeModal( )}>&times;</span>
            <p>{this.props.text}
            </p>
          </div>
        </div>
        
    }
}
 export default ModalLogin;