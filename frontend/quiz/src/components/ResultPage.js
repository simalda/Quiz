import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";

class ResultPage extends React.Component {
    constructor(props) {
      super(props);
    }
    incorrectAnswers = this.props.numberOfQuestions -
    this.props.numberOfCorrectAnswers
    percentage = (this.props.numberOfCorrectAnswers*100)/this.props.numberOfQuestions
  render(){return (
    <div className="answer">
    <h3> Result  </h3>
    <div>Your result is {this.percentage} %: number of correct answers -- {this.props.numberOfCorrectAnswers}, 
    number of inccorect answers -- {this.incorrectAnswers}</div>
    </div>
  );
  }
}

export default ResultPage;
