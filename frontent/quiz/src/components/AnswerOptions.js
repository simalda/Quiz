import React from 'react'



function AnswerOptions({title, onClick}){
    const prop = {title, onClick}
    console.log('ON CLICK', prop)
    return(
          <div id="answer" className="answer" onClick = {() => {onClick(title);}}>
      <h4>{title}</h4>
      </div>
    );
  }

  export default  AnswerOptions