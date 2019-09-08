import React from 'react'

function Header({page}){
  var message;
  if(page === 1){ 
    message =  <div><h1>Welcome</h1>
    <p>Select what you want to learn</p></div>}else {
    message =  <div><h1>Python Quiz - Basics</h1>
    <p>Select the correct answer and press  "Continue"</p></div>
  }
    return(
      <div className = "row">
      <div className="jumbotron col-10 offset-1">
      {message}
      </div>
      </div>
    );
  }

  export default  Header