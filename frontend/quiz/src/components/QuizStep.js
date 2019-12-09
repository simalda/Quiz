import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { continueButton, SelectAnswer } from "../redux/actions";
import { submitAnswer } from "../redux/thunkActions";

import AnswerOptions from "./AnswerOptions";
import ContinueButton from "./ContinueButton";

class ConnectedCQuizStep extends React.Component {
  renderAnswer(title) {
    return (
      <AnswerOptions
        title={title}
        key={title}
        highlight={
          title === this.props.chosenAnswer
            ? title === this.props.correctAnswer
              ? "correct"
              : "incorrect"
            : undefined
        }
        onClick={this.props.onAnswerSelected}
      />
    );
  }

  continueButton() {
    if (this.props.isAnswerSelected === 1) {
      if (
        parseInt(this.props.numberOfQuestions, 10) ===
        this.props.numberOfCurrentQuestion + 1
      ) {
        this.props.continueButtonLast();
      } else {
        this.props.continueButtonClicked();
      }
    }
  }

  render() {
    return (
      <div id="container-quiz_step">
        <div className="text heade">
          {this.props.numberOfCurrentQuestion + 1}\
          {this.props.numberOfQuestions}
        </div>
        <div className="text">
          <h3 id={"question" + this.props.numberOfCurrentQuestion}>
            {this.props.question}
          </h3>
        </div>

        {this.props.answerOptions.map(title => this.renderAnswer(title[0]))}
        <ContinueButton
          isAnswerSelected={this.props.isAnswerSelected}
          nextTurn={() => this.continueButton()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    chosenAnswer: state.setQuizReducer.chosenAnswer,
    correctAnswer: state.setQuizReducer.correctAnswer,
    numberOfCurrentQuestion: state.setQuizReducer.numberOfCurrentQuestion,
    numberOfQuestions: state.numberOfQuestionsReducer.numberOfQuestions,
    question: state.setQuizReducer.question,
    answerOptions: state.setQuizReducer.answerOptions,
    isAnswerSelected: state.setQuizReducer.isAnswerSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    continueButtonClicked: () => {
      dispatch(continueButton());
    },
    onAnswerSelected: title => {
      dispatch(SelectAnswer(title));
    },
    continueButtonLast: () => {
      dispatch(submitAnswer());
    }
  };
};

const QuizStep = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConnectedCQuizStep));

export default QuizStep;
