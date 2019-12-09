import React from "react";

import { connect } from "react-redux";
import { onNUmberOfQuestionsSelected } from "../redux/thunkActions";
import { Link } from "react-router-dom";

class ConnectedChoseNUmberOfQuestions extends React.Component {
  handleSubmit(submitter) {
    var value = document.getElementById("numberOfQuestionsInput").value;
    submitter(value);
  }

  render() {
    return (
      <div id="container-choose">
        <div className="heade">{this.props.lang}</div>
        <div className="chooseNumberText">
          How many questions do you want in your quiz?
        </div>
        <input
          id="numberOfQuestionsInput"
          className="chooseNumberInput"
          type="text"
          name="numberOfQuestions"
        />
        <Link
          to="/quizStep"
          className="startQuiz"
          onClick={() => this.handleSubmit(this.props.chooseNumberOfQuestions)}
        >
          <div id="startButton">START THE QUIZ</div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
    lang: state.languageReducer.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chooseNumberOfQuestions: questionNum => {
      dispatch(onNUmberOfQuestionsSelected(questionNum));
    }
  };
};

const ChoseNUmberOfQuestions = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedChoseNUmberOfQuestions);

export default ChoseNUmberOfQuestions;
