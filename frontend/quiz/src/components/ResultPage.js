import React from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";

class ConnectedResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.incorrectAnswers =
      this.props.numberOfQuestions - this.props.numberOfCorrectAnswers;
    this.percentage = (
      (this.props.numberOfCorrectAnswers * 100) /
      this.props.numberOfQuestions
    ).toFixed(1);
  }
  handleSubmit(submitter, lang) {
    submitter(lang);
  }
  render() {
    if (this.props.numberOfQuestions === 0) {
      return <Redirect to={"/"} />;
    }
    var resultList = [];
    var i;
    for (i = 0; i < parseInt(this.props.numberOfQuestions, 10); i++) {
      var color;
      if (
        this.props.quiz[i].correctAnswer === this.props.quiz[i].chosenAnswer
      ) {
        color = "correctBorder";
      } else {
        color = "incorrectBorder";
      }

      resultList.push(
        <div key={i} className={color + "   results"}>
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
      <div id="container-result">
        <div className="heade top"> RESULT: {this.percentage} % </div>
        <div className="text font30">
          Correct answers -- {this.props.numberOfCorrectAnswers}, Incorrect
          answers -- {this.incorrectAnswers}
        </div>
        <div className="text2">{resultList.map(item => item)} </div>
        <div
          id="startQuizButton"
          className="button reStartQuiz  top"
          onClick={() =>
            this.handleSubmit(this.props.onLanguageSelected, this.props.lang)
          }
        >
          START NEW QUIZ
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    numberOfCorrectAnswers: state.setQuizReducer.numberOfCorrectAnswers,
    numberOfQuestions: state.numberOfQuestionsReducer.numberOfQuestions,
    quiz: state.setQuizReducer.quiz,
    lang: state.languageReducer.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLanguageSelected: lang => {
      dispatch(setLanguage(lang));
    }
  };
};

const ResultPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedResultPage);

export default ResultPage;
