import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
//import reduce from functools;
import propTypes from 'prop-types';//???????????????????
import './Quiz.css';
import './bootstrap.min.css';
import { Link } from 'react-router-dom'
import ContinueButton from './components/ContinueButton'
import NavBar from './components/NavBar'
import Header from './components/Header'
import MainPage from './components/MainPage'
import AnswerOptions from './components/AnswerOptions'
import QuizStep from './components/QuizStep'

function getQuestions(Subject = '') {

    fetch("http://127.0.0.1:5000/selectQuestions")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            document.getElementById("fulltable").innerText = myJson;
        });
}

const quiz = 3//getQuestions()





class App extends React.Component {
    constructor(props) {
        super(props);

        this.highlight = '';
        this.state = { page: 1, isClicked: 0 };
               
        this.kAnswer = 'gfrde'
        this.quiz2 = [{
            question: "Which of the following are valid ways to specify the string literal foo'bar in Python:",
            answer: ["foo'bar", "sd", "1a", "1b", "1c"],
        },
        {
            question: ">>> print(r'foo\\bar\nbaz')",
            answer: ["foo\bar\n        baz", "2a,", "2b", "2c"],
        },
        {
            question: "Which of the following is not a Python built-in function:",
            answer: ["isinstance()", "jjk", "uyuyu", "hh"]
        },
        {
            question: "a",
            answer: ["b", "n", "c", "d", "x"]
        }
        ];
        this.turnData = this.getTurnData(this.quiz2);
        this.onAnswerSelected2 = (kAnswer)=> this.onAnswerSelected( kAnswer);

    }


    getTurnData(quiz) {
        const allAnswerOptions = this.quiz2.reduce(function (p, c, i) {
            return p.concat(c.answer);
        }, []);
        //const allAnswerOptions = quiz2.answer
        const question = sample(this.quiz2);
        const correctAnswer = sample(question.answer);
        const treeRandomOptions = shuffle(allAnswerOptions).slice(0, 3);
        console.log('treeRandomOptions', typeof (treeRandomOptions))
        treeRandomOptions.push(correctAnswer)
        return {
            question: question,
            correctAnswer: correctAnswer,
            answerOptions: treeRandomOptions
        }
    };


    onAnswerSelected(kAnswer) {
        this.setState((state) => {
            return {page:0, isClicked:1}
        });
        const isCorrect = this.turnData.question.answer.some((sAnswer) => sAnswer === kAnswer);
        this.highlight = isCorrect ? 'correct' : 'wrong';
        }


    onLanguageSelected(lang){
        this.setState((state) => {
            return {page:0}
        });
        
    }
    render() {
        var body;
        if (this.state.page === 1) {
            body = <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6"><MainPage onLanguageSelected={(x) => this.onLanguageSelected(x)}/></div>
                <div className="col-lg-3"></div>
            </div>
        } else {
            body = <div><div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10"><QuizStep   {...this.turnData} highlight={this.highlight} 
                onAnswerSelected={(x) => this.onAnswerSelected(x)} isClicked={this.state.isClicked}/></div>
                <div className="col-lg-1"></div>
            </div>
            <div className="row">
                    <div className="col-lg-9"></div>
                    <div className="col-lg-1"> <ContinueButton nextTurn={this.nextTurn} /></div>
                    <div className="col-lg-2"></div>
            </div>
                </div>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <NavBar />
                        <Header page={this.state.page} />
                    </div>
                </div>

                {body}

                <div className="row">
                    <div className="col-lg-12">
                        <p><Link id="addQuestion" to="/add" >Add a question</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}


function AuthorWrapper() {
    return <AddAuthorForm onAddAuthor={console.log} />;
}


function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//registerServiceWorker();
