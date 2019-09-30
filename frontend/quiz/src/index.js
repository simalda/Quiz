import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";
import { BrowserRouter, Route } from "react-router-dom";
import AddAuthorForm from "./AddAuthorForm";
//import reduce from functools;
import propTypes from "prop-types"; //???????????????????
import "./Quiz.css";
import "./bootstrap.min.css";
import { Link } from "react-router-dom";
import ContinueButton from "./components/ContinueButton";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import AnswerOptions from "./components/AnswerOptions";
import QuizStep from "./components/QuizStep";
import ResultPage from "./components/ResultPage";
import ChoseNUmberOfQuestions from "./components/ChoseNUmberOfQuestions";

// function getQuestions(Subject = "") {
//   fetch("http://127.0.0.1:5000/selectQuestions")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//       document.getElementById("fulltable").innerText = myJson;
//     });
// };

 

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 1,
      lang: "",
      quiz: [],
      isAnswerSelected: 0,
      question: undefined,
      correctAnswer: undefined,
      answerOptions: undefined,
      selectedAnswer: "",
      quiz2: undefined,
      numberOfQuestions: 0,
      numberOfCurrentQuestion: 0,
      numberOfCorrectAnswers: 0
    };
  }

  // getQuestions(x) {
  //   fetch("http://127.0.0.1:5000/selectQuestions")
  //     .then(response => response.json())
  //     .then(x);
  // }

  getQuestions(lang, numberOfQuestions) {
    return fetch(`http://127.0.0.1:5000/selectQuestions/${lang}/${numberOfQuestions}`, {
      
    }).then(response => response.json())
  }

  prepareQuiz(quiz) {
    const allAnswerOptions = quiz.reduce(function(p, c, i) {
      return p.concat(c.answer);
    }, []);
    const question = sample(quiz);
    const correctAnswer = quiz.correctAnswer;
    const treeRandomOptions = shuffle(question.answerOptions).slice(0, 3);
    console.log("treeRandomOptions", typeof treeRandomOptions);
    treeRandomOptions.push(correctAnswer);
    shuffle(treeRandomOptions);
    return {
      question: question,
      correctAnswer: correctAnswer,
      answerOptions: treeRandomOptions
    };
  }

  onAnswerSelected(kAnswer) {
      
    if (this.state.isAnswerSelected === 0) {
      this.state.quiz[this.state.numberOfCurrentQuestion-1].chosenAnswer = kAnswer
    this.setState({
        ...this.state,
        numberOfCorrectAnswers:
          kAnswer === this.state.correctAnswer
            ? this.state.numberOfCorrectAnswers + 1
            : this.state.numberOfCorrectAnswers,
        isAnswerSelected: 1,
        selectedAnswer: kAnswer
     
      });
    }
  }

  onLanguageSelected(lang) {
    this.setState({
      ...this.state,
      lang: lang,
      page: 3});
    }


  onNUmberOfQuestionsSelected(lang, numberOfQuestions){ 
     this.getQuestions(lang, numberOfQuestions).then(quizData => {
      var turnDataArray = [...Array(numberOfQuestions).keys()].map(() =>
        this.prepareQuiz(quizData)
      );
      console.log("quizData")
      console.log(quizData)
      console.log("sturnDataArray")
      console.log(turnDataArray)
       
      this.setState({
        ...this.state,
        page: 0,
        numberOfQuestions: numberOfQuestions,
        quiz: quizData,
        question: quizData[this.state.numberOfCurrentQuestion].question,
        correctAnswer:
        quizData[this.state.numberOfCurrentQuestion].correctAnswer,
        answerOptions:
        quizData[this.state.numberOfCurrentQuestion].answerOptions,
        numberOfCurrentQuestion: this.state.numberOfCurrentQuestion + 1
      });
    });
  }

  // onLanguageSelected(lang) {
  //   var turnData;
  //   var i
  //   for(i=0; i<10;  i++){
  //       this.state.quiz[i] =this.prepareQuiz( this.staticQuiz )
  //   }

  //     this.setState({
  //       ...this.state,
  //       page: 0,
  //       //quiz: quiz,
  //       question: this.state.quiz[this.state.currentQuestion].question,
  //       correctAnswer: this.state.quiz[this.state.currentQuestion].correctAnswer,
  //       answerOptions: this.state.quiz[this.state.currentQuestion].answerOptions,
  //       currentQuestion: this.state.currentQuestion + 1
  //     });

  // }

  continueButtonClicked() {    
    if(this.state.isAnswerSelected == 1){
      if (parseInt(this.state.numberOfQuestions, 10) === this.state.numberOfCurrentQuestion) {
        this.setState({
          ...this.state,
          page: 2
        });
        } else {
        this.setState({
        ...this.state,
        isAnswerSelected: 0,
        question: this.state.quiz[this.state.numberOfCurrentQuestion].question,
        correctAnswer: this.state.quiz[this.state.numberOfCurrentQuestion]
          .correctAnswer,
        answerOptions: this.state.quiz[this.state.numberOfCurrentQuestion]
          .answerOptions,
        numberOfCurrentQuestion: this.state.numberOfCurrentQuestion + 1,
        selectedAnswer: ""
      });
    }
  }
  else{
    this.setState({
      ...this.state,
      page: 0
    });
  }
  }

  

  render() {
    var body;
    if (this.state.page === 1) {
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <MainPage onLanguageSelected={x => this.onLanguageSelected(x)} />
          </div>
          <div className="col-lg-3"></div>
          <div className="row">
          <div className="col-lg-12">
            <p>
              <Link id="addQuestion" to="/add">
                Add a question
              </Link>
            </p>
          </div>
        </div>
        </div>
      );
    } 
    else if (this.state.page === 3) {
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <ChoseNUmberOfQuestions onNUmberOfQuestionsSelected={(x,y) => this.onNUmberOfQuestionsSelected(x,y)} 
            {...this.state} />
          </div>
          <div className="col-lg-3"></div>
        </div>
      );
    }else if (this.state.page === 0) {
      body = (
        <div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <QuizStep
                {...this.state}
                onAnswerSelected={x => this.onAnswerSelected(x)}
              />
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row">
            <div className="col-lg-9"></div>
            <div className="col-lg-1">
              {" "}
              <ContinueButton nextTurn={() => this.continueButtonClicked()} />
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      );
    } else if (this.state.page === 2) {
      body = (
        <div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <ResultPage {...this.state} />
               
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row">
            <div className="col-lg-9"></div>
            <div className="col-lg-1">
              {" "}
              {}
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <NavBar />
            <Header page={this.state.page} lang = { this.state.lang} />
          </div>
        </div>

        {body}

        
      </div>
    );
  }
}


function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
{/* <Route path="/add" component={AuthorWrapper} /> */}
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//registerServiceWorker();
