import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import "./chooseNumberofQuestions.css";
import "./login.css";
import "./QuizStep";

function AnswerOptions({ title, highlight, onClick }) {
  var clasname =  "top10 answers button  "+ (!!highlight ? highlight : "");

  return (
    <div id="answer" className={clasname} onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

export default AnswerOptions;
