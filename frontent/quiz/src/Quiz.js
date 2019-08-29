import React, {Component} from 'react';
import propTypes from 'prop-types';//???????????????????

import './Quiz.css';
import './bootstrap.min.css';
import {Link} from 'react-router-dom'

import ContinueButton from './components/ContinueButton'
import NavBar from './components/NavBar'
import Header from './components/Header'
//import Turn from './components/Turn'
//import AnswerOptions from './components/AnswerOptions'







Turn.propTypes = {
  author:propTypes.shape({
    question: propTypes.string.isRequired,
    answer:propTypes.arrayOf(propTypes.string).isRequired
  }),
  onAnswerSelected:propTypes.func.isRequired,
  highlight: propTypes.string.isRequired

};

function Turn({answerOptions,  correctAnswer, question, highlight, onAnswerSelected}){
  function highlightColor(highlight){
    const mapping = {
      'none':'',
      'correct': 'green',
      'wrong':'red'
    };
    return mapping[highlight];
  }

  return(
  <div className="row turn" style={{backgroundColor: highlightColor(highlight)}}>
<div className="col-4 offset-1 answer">
<h1 id="question">{question.question}</h1>
</div>
<div className="col-6">
{ answerOptions.map( (title) => <AnswerOptions title ={title} key ={title} onClick ={onAnswerSelected}/>) }
</div>
  </div>
    );
};

function AnswerOptions({title, onClick}){
  const prop = {title, onClick}
  console.log('ON CLICK', prop)
  return(
        <div name="answer" className="answer" onClick = {() => {onClick(title);}}>
    <h4>{title}</h4>
    </div>
  );
}

function Quiz(  {turnData, highlight, onAnswerSelected, nextTurn}){
     return (
    <div className="container-fluid">
        <NavBar/>
       <Header/>
        <Turn   {...turnData} highlight = {highlight} onAnswerSelected = {onAnswerSelected} />
        <ContinueButton nextTurn= {nextTurn}/>
        <p><Link id="addQuestion" to="/add" >Add a question</Link></p>        
    </div>
  );
}


export default Quiz;
