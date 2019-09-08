import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

class AnswerOptions extends React.Component{
  constructor(props) {
    super(props)
    this.state ={clasname : "answer"}
  }
     
    render(){return(
          <div id="answer" className = {this.state.clasname}  
          onClick = {() => {this.props.onClick(this.props.title); this.props.highlight === "correct" ? this.state.clasname = "answer correct":this.state.clasname = "answer incorrect"}  }>
      <h4>{this.props.title}</h4>
      </div>
    );
  }
}

  export default  AnswerOptions
 
