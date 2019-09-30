import React from 'react'

function Header({page, lang}){
  var message;
  if(page === 0){
    message =  <div><h1>{lang} Quiz  </h1>
    <p>Select the correct answer and press  "Continue"</p></div>  }
  else  if(page === 1){ 
      message =  <div><h1>Welcome</h1>
      <p>Select what you want to learn</p></div>}
  else if(page === 2){
    message =  <div><h1>{lang} Quiz  </h1>
    <p>Results:  you can see you current and previous results on this page.</p></div>  }
  else if(page === 3){
      message =  <div><h1>{lang} Quiz - Chose Number of Questions</h1></div>  }

    return(
      <div className = "row">
      <div className="jumbotron col-10 offset-1">
      {message}
      </div>
      </div>
    );
  }

  export default  Header