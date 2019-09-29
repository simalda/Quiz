import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 

class ChoseNUmberOfQuestions extends React.Component {
    constructor(props) {
        super(props)     
      }

    render(){return(
        <div >
            <div >
            How many questions do you want in your questionary?
             
            <input type="text" name="numberOfQuestions"  />  
            <button  onClick = {()=> this.props.onNUmberOfQuestionsSelected()}>Submit</button> 
            
            </div> 
       
          
   </div>
         
    );
}         }
   export default  ChoseNUmberOfQuestions