import * as BackendProxy from "../JS/BackendProxy";
import * as Actions from "./actions";

import history from "../JS/history";

import CreateUserStatus from "../JS/CreateUserStatus";

export function login(user, password) {
  return (dispatch, getState) => {
    dispatch(Actions.login(Actions.AsyncState.Started, user));
    BackendProxy.checkUser(user, password)
      .then(loginResponse => {
        if (loginResponse === 1) {
          history.push("/main");
          dispatch(Actions.login(Actions.AsyncState.Success, user));
        } else {
          dispatch(Actions.login(Actions.AsyncState.Failure, null, true));
        }
      })
      .catch(() => {
        dispatch(Actions.login(Actions.AsyncState.Failure, null));
      });
  };
}

export function statistics(user) {
  return (dispatch, getState) => {
    dispatch(Actions.statistics());

    history.push("/statistics");

    BackendProxy.getStatistics(user)
      .then(response => {
        dispatch(Actions.statistics(Actions.AsyncState.Success, response));
      })
      .catch(() => dispatch(Actions.statistics(Actions.AsyncState.Failure)));
  };
}

export function onNUmberOfQuestionsSelected(numberOfQuestions) {
  return (dispatch, getState) => {
    const lang = getState().languageReducer.lang;
    dispatch(
      Actions.chooseNumberOfQuestion(
        Actions.AsyncState.Started,
        numberOfQuestions,
        lang,
        true
      )
    );

    BackendProxy.getQuestions(lang, numberOfQuestions)
      .then(response => {
        dispatch(Actions.creatQuizSuccess(response, false));
      })
      .catch(() =>
        dispatch(Actions.chooseNumberOfQuestion(Actions.AsyncState.Failure))
      );
  };
}

export function submitAnswer() {
  return (dispatch, getState) => {
    let a = getState().userReducer.user;
    if (getState().userReducer.user !== "guest") {
      BackendProxy.addQuiz(a, getState().setQuizReducer.quiz)
        .then(() => history.push("/results"))
        .catch(() =>
          dispatch(Actions.continueButtonLast(Actions.AsyncState.Failure))
        );
    } else {
      history.push("/results");
    }
  };
}

export function signUpSubmit(name, pass, pass2) {
  let re1 = new RegExp("^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$");
  return (dispatch, getState) => {
    if (!name.match(re1)) {
      dispatch(Actions.emailNotValid());
    } else if (pass !== pass2) {
      dispatch(Actions.TwoPassAreNotEqual());
    } else {
      BackendProxy.creatUser(name, pass).then(response => {
        if (response === CreateUserStatus.CreateUserSuccess) {
          dispatch(Actions.signUpSuccess(name));
        } else if (response === CreateUserStatus.UserAlreadyExists) {
          dispatch(Actions.UserAlreadyExists());
        } else if (response === CreateUserStatus.CantCreateUserInDB) {
          dispatch(Actions.CantCreateUserInDB(name));
        }
      });
    }
  };
}
