import React from "react";

//import propTypes from "prop-types";

import NavBar from "../components/NavBar";
import Test from "../components/Test";
import MainPage from "../components/MainPage";
import QuizStep from "../components/QuizStep";
import ResultPage from "../components/ResultPage";
import AboutUs from "../components/AboutUs";
import ChoseNUmberOfQuestions from "../components/ChoseNUmberOfQuestions";

import LogInPage from "../components/LogInPage";
import Statistics from "../components/Statistics";
import { BrowserRouter, Route } from "react-router-dom";
import history from "../JS/history";
import { Router } from "react-router";

import { Provider } from "react-redux";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";

class App extends React.Component {
  // signUp(name, pass, pass2) {
  //   let re1 = new RegExp("^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$");
  //   if (!name.match(re1)) {
  //     this.setState({
  //       ...this.state,
  //       modal: modalKinds.EmailNotValid
  //     });
  //   } else if (pass !== pass2) {
  //     this.setState({
  //       ...this.state,
  //       modal: modalKinds.TwoPassAreNotEqual
  //     });
  //   } else {
  //     this.creatUser(name, pass).then(userData => {
  //       if (userData === 0) {
  //         this.setState({
  //           ...this.state,
  //           page: pages.Main,
  //           user: userData.user,
  //           modal: modalKinds.Nothing
  //         });
  //       } else if (userData === 2) {
  //         this.setState({
  //           ...this.state,
  //           modal: 4
  //         });
  //       } else if (userData === 3) {
  //         this.setState({
  //           ...this.state,
  //           modal: 5
  //         });
  //       }
  //     });
  //   }
  // }

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
