import React from "react";

import "./QuizStep";

function AnswerOptions({ title, highlight, onClick, index }) {
  let className =
    "top10 answers button  " + (!!highlight ? highlight : "notSelected");
  let id = "answer" + index;

  return (
    <div id={id} className={className} onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

export default AnswerOptions;
