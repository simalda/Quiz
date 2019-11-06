import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";
import { BrowserRouter, Route } from "react-router-dom";
import propTypes from "prop-types";
import "./Quiz.css";
import "./bootstrap.min.css";
import { Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import QuizStep from "./components/QuizStep";
import ResultPage from "./components/ResultPage";
import ChoseNUmberOfQuestions from "./components/ChoseNUmberOfQuestions";
import { getQuestions } from "./BackendProxy";
import { getLanguages } from "./BackendProxy";

import LogInPage from "./components/LogInPage";
import modalKinds from "./ModlKind";
import Stattistics from "./components/Stattistics";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: -1,
      lang: "",
      quiz: [],
      isAnswerSelected: 0,
      question: undefined,
      answerOptions: undefined,
      selectedAnswer: "",
      numberOfQuestions: 0,
      numberOfCurrentQuestion: 0,
      numberOfCorrectAnswers: 0,
      user: "guest",
      modal: modalKinds.Nothing,
      dropdownshow: 0,
      userStat: ""
    };
  }

  creatUser(user, password) {
    var userEncoded = encodeURIComponent(user);
    var paswEncoded = encodeURIComponent(password);
    return fetch(
      `http://127.0.0.1:5000/signup/${userEncoded}/${paswEncoded}`
    ).then(response => response.json());
  }

  checkUser(user, password) {
    var userEncoded = encodeURIComponent(user);
    var paswEncoded = encodeURIComponent(password);
    return fetch(
      `http://127.0.0.1:5000/login/${userEncoded}/${paswEncoded}`
    ).then(response => response.json());
  }

  getStatistics(user) {
    var userEncoded = encodeURIComponent(user);

    return fetch(`http://127.0.0.1:5000/stat/${userEncoded}`).then(response =>
      response.json()
    );
  }

  addQuiz() {  
    var userEncoded = encodeURIComponent(this.state.user);
    // let dataToSend = new Array(this.state.user, this.state.quiz)
    fetch(`http://127.0.0.1:5000/stat/${userEncoded}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:   JSON.stringify( this.state.quiz)
    });
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
      this.state.quiz[
        this.state.numberOfCurrentQuestion - 1
      ].chosenAnswer = kAnswer;
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
      page: 3,
      quiz: [],
      numberOfCurrentQuestion: 0,
      isAnswerSelected: 0
    });
  }

  onNUmberOfQuestionsSelected(lang, numberOfQuestions) {
    getQuestions(lang, numberOfQuestions).then(quizData => {
      var turnDataArray = [...Array(numberOfQuestions).keys()].map(() =>
        this.prepareQuiz(quizData)
      );

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

  getStat() {
    this.getStatistics(this.state.user).then(statData => {
      this.setState({
        ...this.state,
        userStat: statData,
        page:5
      });
    });
  }

  onLoginSelected(user, pasp) {
    this.checkUser(user, pasp).then(userData => {
      if (userData === 1) {
        this.setState({
          ...this.state,
          page: 1,
          user: user
        });
      } else if (userData === 2) {
        this.setState({
          ...this.state,
          modal: modalKinds.WrongParameters
        });
      } else if (userData === 0) {
        this.setState({
          ...this.state,
          modal: modalKinds.WrongParameters
        });
      }
    });
  }

  onEnterAsaGuestSelected() {
    this.setState({
      ...this.state,
      page: 1,
      user: "guest"
    });
  }

  continueButtonClicked() {
    if (this.state.isAnswerSelected === 1) {
      if (
        parseInt(this.state.numberOfQuestions, 10) === this.state.numberOfCurrentQuestion   ) {
        this.addQuiz()
        this.setState({
          ...this.state,
          page: 2
        });
      } else {
        this.setState({
          ...this.state,
          isAnswerSelected: 0,
          question: this.state.quiz[this.state.numberOfCurrentQuestion]
            .question,
          correctAnswer: this.state.quiz[this.state.numberOfCurrentQuestion]
            .correctAnswer,
          answerOptions: this.state.quiz[this.state.numberOfCurrentQuestion]
            .answerOptions,
          numberOfCurrentQuestion: this.state.numberOfCurrentQuestion + 1,
          selectedAnswer: ""
        });
      }
    } else {
      this.setState({
        ...this.state,
        page: 0
      });
    }
  }

  onSignupSelected() {
    this.setState({
      ...this.state,
      modal: modalKinds.OpenSignup
    });
  }

  signUp(name, pass, pass2) {
    let re1 = new RegExp("^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$");
    if (!name.match(re1)) {
      this.setState({
        ...this.state,
        modal: modalKinds.EmailNotValid
      });
    } else if (pass != pass2) {
      this.setState({
        ...this.state,
        modal: modalKinds.TwoPassAreNotEqual
      });
    } else {
      this.creatUser(name, pass).then(userData => {
        if (userData === 0) {
          this.setState({
            ...this.state,
            page: 1,
            user: userData.user,
            modal: modalKinds.Nothing
          });
        } else if (userData === 2) {
          this.setState({
            ...this.state,
            modal: 4
          });
        } else if (userData === 3) {
          this.setState({
            ...this.state,
            modal: 5
          });
        }
      });
    }
  }

  closeModal() {
    this.setState({
      ...this.state,
      modal: modalKinds.Nothing
    });
  }

  render() {
    var body;
    if (this.state.page === -1) {
      body = (
        <div className="row">
          <div className="col-lg-12">
            <LogInPage
              {...this.state}
              onLoginSelected={(x, y) => this.onLoginSelected(x, y)}
              closeModal={() => this.closeModal()}
              onSignupSelected={() => this.onSignupSelected()}
              onEnterAsaGuestSelected={() => this.onEnterAsaGuestSelected()}
              signUp={(x, y, z) => this.signUp(x, y, z)}
            />
          </div>
        </div>
      );
    } else if (this.state.page === 1) {
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <MainPage
              {...this.state}
              onLanguageSelected={x => this.onLanguageSelected(x)}
            />
          </div>
          <div className="col-lg-3"></div>
          
        </div>
      );
    } else if (this.state.page === 3) {
      body = (
        <div className="row">
          <ChoseNUmberOfQuestions
            onNUmberOfQuestionsSelected={(x, y) =>
              this.onNUmberOfQuestionsSelected(x, y)
            }
            {...this.state}
          />
        </div>
      );
    } else if (this.state.page === 0) {
      body = (
        <QuizStep
          {...this.state}
          onAnswerSelected={x => this.onAnswerSelected(x)}
          continueButtonClicked={() => this.continueButtonClicked()}
        />
      );
    } else if (this.state.page === 2) {
      body = (
        <div>
          <ResultPage
            {...this.state}
            onLanguageSelected={x => this.onLanguageSelected(x)}
          />
        </div>
      );
    } else if (this.state.page === 5){
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
           <Stattistics  {...this.state} />
          </div>
          <div className="col-lg-3"></div>
          
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <NavBar
              {...this.state}
              onLanguageSelected={x => this.onLanguageSelected(x)}
              dropdownClicked={() => this.dropdownClicked}
              getStat={() => this.getStat()}
            />
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
        <Route path="/main" component={MainPage} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
render();

serviceWorker.unregister();
//registerServiceWorker();
