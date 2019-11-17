import React, { Component } from "react";
 

import { shuffle, sample } from "underscore";

//import propTypes from "prop-types";



import NavBar from "../components/NavBar";
import MainPage from "../components/MainPage";
import QuizStep from "../components/QuizStep";
import ResultPage from "../components/ResultPage";
import ChoseNUmberOfQuestions from "../components/ChoseNUmberOfQuestions";
import * as BackendProxy from "../JS/BackendProxy";

import LogInPage from "../components/LogInPage";
import modalKinds from "../JS/ModlKind";
import pages from "../JS/pages";
import Stattistics from "../components/Stattistics";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: pages.Login,
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
  prepareQuiz(quiz) {
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
        this.state.numberOfCurrentQuestion - 1].chosenAnswer = kAnswer;
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
      page: pages.NumberofQuestions,
      quiz: [],
      numberOfCurrentQuestion: 0,
      isAnswerSelected: 0
    });
  }

  onNUmberOfQuestionsSelected(lang, numberOfQuestions) {
    BackendProxy.getQuestions(lang, numberOfQuestions).then(quizData => {
      this.setState({
        ...this.state,
        page: pages.QuizStep,
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
        page: pages.Statistics
      });
    });
  }

  onLoginSelected(user, pasp) {
    this.checkUser(user, pasp).then(userData => {
      if (userData === 1) {
        this.setState({
          ...this.state,
          page: pages.Main,
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
      page: pages.Main,
      user: "guest"
    });
  }

  continueButtonClicked() {
    if (this.state.isAnswerSelected === 1) {
      if (
        parseInt(this.state.numberOfQuestions, 10) === this.state.numberOfCurrentQuestion   ) {
        BackendProxy.addQuiz(this.state.user,this.state.quiz)
        this.setState({
          ...this.state,
          page: pages.Results
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
        page: pages.QuizStep
      });
    }
  }

  onSignupSelected() {
    this.setState({
      ...this.state,
      modal: modalKinds.OpenSignup
    });
  }

  AboutUs(){
    this.setState({
      ...this.state,
      page: pages.AboutUs
    });
  }

  signUp(name, pass, pass2) {
    let re1 = new RegExp("^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$");
    if (!name.match(re1)) {
      this.setState({
        ...this.state,
        modal: modalKinds.EmailNotValid
      });
    } else if (pass !== pass2) {
      this.setState({
        ...this.state,
        modal: modalKinds.TwoPassAreNotEqual
      });
    } else {
      this.creatUser(name, pass).then(userData => {
        if (userData === 0) {
          this.setState({
            ...this.state,
            page: pages.Main,
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
    if (this.state.page === pages.Login) {
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
    } else if (this.state.page === pages.Main) {
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
    } else if (this.state.page === pages.NumberofQuestions) {
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
    } else if (this.state.page === pages.QuizStep) {
      body = (
        <QuizStep
          {...this.state}
          onAnswerSelected={x => this.onAnswerSelected(x)}
          continueButtonClicked={() => this.continueButtonClicked()}
        />
      );
    } else if (this.state.page === pages.Results) {
      body = (
        <div>
          <ResultPage
            {...this.state}
            onLanguageSelected={x => this.onLanguageSelected(x)}
          />
        </div>
      );
    } else if (this.state.page === pages.Statistics){
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
           <Stattistics  {...this.state} />
          </div>
          <div className="col-lg-3"></div>
          
        </div>
      );
    } else if (this.state.page === pages.AboutUs){
      body = (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
          Owner: Sofya Kamenkovich - Kolodizner
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
              AboutUs={()=>this.AboutUs()}
            />
          </div>
        </div>

        {body}
        
      </div>
    );
  }
}
 
export default App
