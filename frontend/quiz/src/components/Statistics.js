import React from "react";

import { connect } from "react-redux";
import * as ThunkActions from "../redux/thunkActions";

class ConnectedStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.resultList = [];
  }
  correctAn(i) {
    let chosen;
    if (this.props.userStat[i]["ChosenAnswerId"] === 0) {
      chosen = (
        <div>Chosen answer: {this.props.userStat[i]["correctAnswer"]}</div>
      );
    } else {
      chosen = (
        <div>Chosen answer: {this.props.userStat[i]["ChosenAnswerId"]}</div>
      );
    }
    return chosen;
  }
  render() {
    let i = 0;
    while (i < this.props.userStat.length) {
      this.resultList.push(
        <div key={i} className="">
          <h5>Question: {i + 1}</h5>
          <div>{this.props.userStat[i]["Question"]}</div>
          <div>Correct answer: {this.props.userStat[i]["correctAnswer"]}</div>
          {this.correctAn(i)}
          <div>
            -------------------------------------------------------------------------------------
          </div>
        </div>
      );
      i++;
    }

    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h3 id="quizNumber">QUIZ {this.props.userStat[0]["QuizId"]}</h3>
          {this.resultList}
        </div>
        <div className="col-lg-3"></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userStat: state.modalReducer.userStat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    statistics: user => {
      dispatch(ThunkActions.statistics(user));
    }
  };
};

const Statistics = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedStatistics);

export default Statistics;
