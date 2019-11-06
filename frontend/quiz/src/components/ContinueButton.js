import React from "react";
import "../index.css";
import "./chooseNumberofQuestions.css";
import "./login.css";

class ContinueButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let clasname =  "top nextQuestion button  "+ ((this.props.isAnswerSelected === 0) ? "gray" : "blue");
     
    return  <button
    className = {clasname}
    key="button"
    id="ContinueButton"
    onClick={() => this.props.nextTurn()}
  >
    NEXT QUESTION
  </button>
  }
}

export default ContinueButton;