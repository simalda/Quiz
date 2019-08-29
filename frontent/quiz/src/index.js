import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Quiz from './Quiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route} from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
//import reduce from functools;

function getQuestions(Subject=''){
   
    fetch("http://127.0.0.1:5000/selectQuestions")
      .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      document.getElementById("fulltable").innerText = myJson;
        });
  }

const quiz = 3//getQuestions()

const quiz2 =
[
    {
question: "Which of the following are valid ways to specify the string literal foo'bar in Python:",
answer: ["foo'bar","sd","1a","1b", "1c"],
    },
    {
        question: ">>> print(r'foo\\bar\nbaz')",
answer: ["foo\bar\n        baz","2a,","2b","2c"],
    },
    {
        question: "Which of the following is not a Python built-in function:" ,
answer: ["isinstance()","jjk","uyuyu","hh"]
    },
    {
    question: "a" ,
answer: ["b","n","c","d","x"]
}


];



function getTurnData(quiz){
    const allAnswerOptions = quiz2.reduce(function(p,c,i){
        return p.concat(c.answer);
    }, []);
    //const allAnswerOptions = quiz2.answer
    const question = sample(quiz2);
    const correctAnswer = sample(question.answer);
    const treeRandomOptions = shuffle(allAnswerOptions).slice(0,3);
    console.log('treeRandomOptions', typeof(treeRandomOptions))
    //const cd = ;
    treeRandomOptions.push(correctAnswer)
    
    

    return{        
        question: question,
        correctAnswer:correctAnswer,
        answerOptions: treeRandomOptions
    }
};

const state = {
        turnData:getTurnData(quiz2),
        highlight :''
    };


 

function onAnswerSelected(kAnswer){
const isCorrect = state.turnData.question.answer.some((sAnswer) => sAnswer === kAnswer);
state.highlight = isCorrect ?'correct':'wrong';
render();
}

function nextTurn(){

    render();
}

function App(){
    return <Quiz {... state} onAnswerSelected = {onAnswerSelected} nextTurn = {nextTurn}/>;
}

 function AuthorWrapper(){
     return <AddAuthorForm onAddAuthor={console.log}/>;     
      }


function render(){
ReactDOM.render(
<BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route  path="/add" component={AuthorWrapper} />
    </React.Fragment>
</BrowserRouter>, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//registerServiceWorker();
