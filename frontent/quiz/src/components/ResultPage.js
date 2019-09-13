import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";

function ResultPage({ title, highlight, onClick }) {
  var clasname = "answer " + (!!highlight ? highlight : "");

  return (
    <div> Result Page </div>
  );
}

export default ResultPage;
