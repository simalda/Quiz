import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnswerOptions from "./AnswerOptions";

class QuizStep extends React.Component {
  constructor(props) {
    super(props);
  }


  renderAnswer(title) {
    return (
      <AnswerOptions
        title={title}
        key={title}
        highlight={
          title === this.props.selectedAnswer
            ? title === this.props.correctAnswer
              ? "correct"
              : "incorrect"
            : undefined
        }
        onClick={this.props.onAnswerSelected}
      />
    );
  }

  render() {
      
    return (
      <div className="row turn">
        <div className="col-4 offset-1 answer">
                    <h1 id={"question"+this.props.numberOfCurrentQuestion}>{this.props.question}</h1>
        </div>
        <div className="col-6">
          {this.props.answerOptions.map(title =>
            this.renderAnswer(title)
          )}
        </div>
      </div>
    );
  }
}

export default QuizStep;
 