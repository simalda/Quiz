import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";

function AnswerOptions({ title, highlight, onClick }) {
  var clasname = "answer " + (!!highlight ? highlight : "");

  return (
    <div id="answer" className={clasname} onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

export default AnswerOptions;
