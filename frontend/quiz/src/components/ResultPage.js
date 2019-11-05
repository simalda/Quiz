import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import "./login.css";
import "./chooseNumberofQuestions.css";

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
  }
  incorrectAnswers =
    this.props.numberOfQuestions - this.props.numberOfCorrectAnswers;
  percentage =
    ((this.props.numberOfCorrectAnswers * 100) / this.props.numberOfQuestions).toFixed(1);

  render() {
    var resultList = [];
    var i;
    for (i = 0; i < parseInt(this.props.numberOfQuestions, 10); i++) {
      var color;
      if (
        this.props.quiz[i].correctAnswer === this.props.quiz[i].chosenAnswer
      ) {
        color = "correctBorder";
      } else {
        color = "incorrectborder";
      }

      resultList.push(
        <div key={i} className={color+" top results"}>
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
      <div className=" ">   
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
            <div className="heade top"> RESULT: {this.percentage} % </div>
              <div className="text font30">  Correct answers --{" "}
                {this.props.numberOfCorrectAnswers}, Inccorect answers --{" "}
                {this.incorrectAnswers}
              </div>
              <div className="text ">{resultList.map(item =>
                      item
                    )} </div>
                <div id="startQuizButton"  className="button startQuiz  top"  onClick={(x)=> this.props.onLanguageSelected(this.props.lang)}>           
                  START NEW QUIZ</div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
       
    );
  }
}

export default ResultPage;
