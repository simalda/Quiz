import React, { Component } from "react";
import ReactDOM from "react-dom";
 
import "./QuizStep";

function AnswerOptions({ title, highlight, onClick }) {
  var clasname =  "top10 answers button  "+ (!!highlight ? highlight : "notSelected");

  return (
    <div id="answer" className={clasname} onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

export default AnswerOptions;
