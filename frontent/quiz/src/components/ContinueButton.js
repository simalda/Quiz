import React from 'react'
import '../index.css';

function ContinueButton({nextTurn}){
    return(<button class ="btn3 default" key="button"  id="ContinueButton" onClick = {nextTurn} > Continue</button>)
  }

  export default  ContinueButton 