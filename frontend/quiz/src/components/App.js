import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//import propTypes from "prop-types";

import NavBar from "../components/NavBar";
import MainPage from "../components/MainPage";
import QuizStep from "../components/QuizStep";
import ResultPage from "../components/ResultPage";
import AboutUs from "../components/AboutUs";
import ChoseNUmberOfQuestions from "../components/ChoseNUmberOfQuestions";

import LogInPage from "../components/LogInPage";
import Statistics from "../components/Statistics";
import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router } from "react-router";

import { Provider } from "react-redux";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";

class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <NavBar />
          <Route exact path="/" component={LogInPage} />
          <Route path="/login" component={ModalLogin} />
          <Route path="/signup" component={ModalSignup} />
          <Route path="/main" component={MainPage} />
          <Route path="/choosesNumber" component={ChoseNUmberOfQuestions} />
          <Route path="/results" component={ResultPage} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/quizStep" component={QuizStep} />
          <Route path="/aboutUs" component={AboutUs} />
        </Router>
      </Provider>
    );
  }
}

export default App;
