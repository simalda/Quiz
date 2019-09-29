import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnswerOptions from './AnswerOptions'

class MainPage extends React.Component {
    constructor(props) {
        super(props)     
      }

    render(){return(
        <div >
        <div id="Python" className="answer"  onClick = {(x)=> this.props.onLanguageSelected(x)}>
        <h4>Python</h4>
      </div>
        <div id="React" className="answer " onClick = {(x)=> this.props.onLanguageSelected(x)}>
        <h4>React</h4>
   </div>
        <div id="SQL" className="answer " onClick = {(x)=> this.props.onLanguageSelected(x)}>   
        <h4>SQL</h4>
      </div>    
        </div>
    );
}         }
   export default  MainPage