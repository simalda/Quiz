import React from "react";

import "./QuizStep";

function AnswerOptions({ title, highlight, onClick }) {
  var className =
    "top10 answers button  " + (!!highlight ? highlight : "notSelected");

  return (
    <div id="answer" className={className} onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

export default AnswerOptions;
