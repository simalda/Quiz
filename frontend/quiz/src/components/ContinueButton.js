import React from 'react'
import '../index.css';
import "./chooseNumberofQuestions.css";
import "./login.css";

class ContinueButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(<button className ="top nextQuestion button" 
    key="button"  id="ContinueButton" onClick = {() =>this.props.nextTurn()} > NEXT QUESTION</button>)
  }
}

export default ContinueButton;
