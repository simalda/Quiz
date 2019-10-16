import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
  }
  incorrectAnswers =
    this.props.numberOfQuestions - this.props.numberOfCorrectAnswers;
  percentage =
    (this.props.numberOfCorrectAnswers * 100) / this.props.numberOfQuestions;

  render() {
    var resultList = [];
    var i;
    for (i = 0; i < parseInt(this.props.numberOfQuestions, 10); i++) {
      var color;
      if (
        this.props.quiz[i].correctAnswer === this.props.quiz[i].chosenAnswer
      ) {
        color = "correct";
      } else {
        color = "incorrect";
      }

      resultList.push(
        <div key={i} className={color}>
          <div>
            <h3>QUESTION {i + 1}</h3>
            {this.props.quiz[i].question}
          </div>
          <div>Correct answer: {this.props.quiz[i].correctAnswer}</div>
          <div>Chosen answer: {this.props.quiz[i].chosenAnswer}</div>
        </div>
      );
    }
    return (
      <div className="answer">
        <h3> Result </h3>
        <div>
          Your result is {this.percentage} %: number of correct answers -- 
          {this.props.numberOfCorrectAnswers}, number of inccorect answers -- 
          {this.incorrectAnswers}
        </div>
        <div>
          --------------------------------------------------------------------------------------
        </div>
        {resultList}
      </div>
    );
  }
}

export default ResultPage;
