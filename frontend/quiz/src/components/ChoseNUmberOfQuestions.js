import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./chooseNumberofQuestions.css";
import "./login.css";

class ChoseNUmberOfQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  handlesubmit(submitter) {
    var value = document.getElementById("numberOfQuestionsInput").value;
    submitter(this.props.lang, value);
  }

  render() {
        return (
      <div className = "col-lg-12">           
            <div className="row   top60">
             <div className="col-lg-5"></div>
              <div className="col-lg-3">  
                  <div className = "heade">{this.props.lang}</div>
                  <div className ="textNumber">How many questions do you want in your quiz?</div>
                  <input id = "numberOfQuestionsInput" className ="inputNumber" type="text" name="numberOfQuestions" />
                 <div    className="startQuiz button top" onClick={() => this.handlesubmit(this.props.onNUmberOfQuestionsSelected)}>           
                  START THE QUIZ</div>
            </div>
            <div className="col-lg-5"></div>
          </div>
      </div>
        );
  }
}
export default ChoseNUmberOfQuestions;
