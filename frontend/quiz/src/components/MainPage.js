import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnswerOptions from "./AnswerOptions";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.languages = ["Python", "React", "SQL"];
  }

  handlesubmit(submitter, id) {
    submitter(id);
  }

  produceLanguages(languages) {
    return languages.map(language => (
      <div
        key = {language}
        className="answer"
        onClick={() =>
          this.handlesubmit(this.props.onLanguageSelected, language)
        }
      >
        <h4>{language}</h4>
      </div>
    ));
  }

  render() {
    return <div>{this.produceLanguages(this.languages)}</div>;
  }
}
export default MainPage;
