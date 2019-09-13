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

const quiz = 3; //getQuestions()

class App extends React.Component {
  constructor(props) {
    super(props);

    this.staticQuiz = [
      {
        question: "q1",
        correctAnswer: "ansq1",
        answerOptions: ["a11", "a12", "a13", "a14"]
      },
      {
        question: "q2",
        correctAnswer: "ansq2",
        answerOptions: ["a21", "a22", "a23"]
      },
      {
        question: "q3",
        correctAnswer: "ansq3",
        answerOptions: ["a31", "a32", "a33", "a34", "a35", "a36"]
      },
      {
        question: "a",
        correctAnswer: "ansq4",
        answerOptions: ["b", "n", "c", "d", "x"]
      }
    ];

    // this.staticQuiz = [
    //   {
    //     question: "q1",
       
    //     answer: ["a11", "a12", "a13", "a14"]
    //   },
    //   {
    //     question: "q2",
         
    //     answer: ["a21", "a22", "a23"]
    //   },
    //   {
    //     question: "q3",
    
    //     answer: ["a31", "a32", "a33", "a34"]
    //   },
    //   {
    //     question: "a",
       
    //     answer: ["b", "n", "c", "d", "x"]
    //   }
    // ];
    this.state = {
      page: 1,
      quiz: [],
      isAnswerSelected: 0,
      question: undefined,
      correctAnswer: undefined,
      answerOptions: undefined,
      selectedAnswer: "",
      quiz2: undefined,
      numberOfQuestions: 2,
      numberOfCurrentQuestion: 0,
      numberOfCorrectAnswers: 0
    };
  }

  getQuestions(x) {
    fetch("http://127.0.0.1:5000/selectQuestions")
      .then(response => response.json())
      .then(x);
  }
   

  getTurnData(quiz) {
    const allAnswerOptions = quiz.reduce(function(p, c, i) {
      return p.concat(c.answer);
    }, []);
     const question = sample(quiz);
    const correctAnswer = quiz.correctAnswer;
    const treeRandomOptions = shuffle(question.answerOptions).slice(0, 3);
    console.log("treeRandomOptions", typeof treeRandomOptions);
    treeRandomOptions.push(correctAnswer);
    shuffle(treeRandomOptions)
    return {
      question: question,
      correctAnswer: correctAnswer,
      answerOptions: treeRandomOptions
    };
  }

  
  onAnswerSelected(kAnswer) {
    if (this.state.isAnswerSelected === 0) {
      // if(this.state.selectedAnswer === this.state.correctAnswer){
      //     numberOfCorrectAnswers : this.state.numberOfCorrectAnswers+1
      // }
      this.setState({
        ...this.state,
        isAnswerSelected: 1,
        selectedAnswer: kAnswer
      });
    }
  }

  onLanguageSelected(lang) {
    var turnData;
    this.getQuestions(quizData => {
      var turnDataArray = [...Array(10).keys()].map(() =>
        this.getTurnData(quizData)
      );

      this.setState({
        ...this.state,
        page: 0,
        quiz: quizData,
        question: quizData[this.state.numberOfCurrentQuestion].question,
        correctAnswer: quizData[this.state.numberOfCurrentQuestion].correctAnswer,
        answerOptions: quizData[this.state.numberOfCurrentQuestion].answerOptions,
        numberOfCurrentQuestion: this.state.numberOfCurrentQuestion + 1
      });
    });
  }

  // onLanguageSelected(lang) {
  //   var turnData;
  //   var i
  //   for(i=0; i<10;  i++){
  //       this.state.quiz[i] =this.getTurnData( this.staticQuiz )
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
    if (this.state.numberOfQuestions === this.state.numberOfCurrentQuestion ) {
      this.setState({
        ...this.state,
        page : 2});
      }
      else {
         this.setState({
      ...this.state,
      isAnswerSelected: 0,
      question: this.state.quiz[this.state.numberOfCurrentQuestion].question,
      correctAnswer: this.state.quiz[this.state.numberOfCurrentQuestion].correctAnswer,
      answerOptions: this.state.quiz[this.state.numberOfCurrentQuestion].answerOptions,
      numberOfCurrentQuestion: this.state.numberOfCurrentQuestion + 1,
      selectedAnswer: ""
    });
  }
}


  prepareQuiz() {}

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
        </div>
      );
    } else if(this.state.page === 0){
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
    } else if(this.state.page === 2){
    body = (
      <div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <ResultPage />
            {alert("The number of correct unswers ,the number of inccorect unswers")}
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