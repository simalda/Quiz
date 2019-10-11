import React, { Component } from "react";
import ReactDOM from "react-dom";

class ChoseNUmberOfQuestions extends React.Component {
  constructor(props) {
    super(props);
  }


  handlesubmit(submitter){
      var value = document.getElementById("numberOfQuestionsInput").value;
      submitter(this.props.lang, value);
  }

  render() {
    var clasname = "answer ";
    return (
      <div>
        <div className={clasname}>
          <div>How many questions do you want in your questionary?</div>
          <input id="numberOfQuestionsInput" type="text" name="numberOfQuestions" />
          <button onClick={() => this.handlesubmit(this.props.onNUmberOfQuestionsSelected)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default ChoseNUmberOfQuestions;
