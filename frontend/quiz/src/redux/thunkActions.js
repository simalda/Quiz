import * as BackendProxy from "../JS/BackendProxy";
import * as Actions from "./actions";

import history from "../JS/history";

export function login(user, password) {
  return (dispatch, getState) => {
    dispatch(Actions.login(Actions.AsyncState.Started, user));
    BackendProxy.checkUser(user, password)
      .then(loginResponse => {
        if (loginResponse === 1) {
          history.push("/main");
          dispatch(Actions.login(Actions.AsyncState.Success, user));
        } else {
          // history.push("/login");
          dispatch(Actions.login(Actions.AsyncState.Failure, null, true));
        }
      })
      .catch(() => {
        // history.push("/login");
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
        lang
      )
    );

    // history.push("/choosesNumber");

    BackendProxy.getQuestions(lang, numberOfQuestions)
      .then(response => {
        dispatch(Actions.creatQuizSuccess(response));
      })
      .catch(() =>
        dispatch(Actions.chooseNumberOfQuestion(Actions.AsyncState.Failure))
      );
  };
}

export function submitAnswer() {
  return (dispatch, getState) => {
    history.push("/results");
    // dispatch(Actions.continueButtonLast());

    if (getState().userReducer.user !== "guest") {
      BackendProxy.addQuiz(
        getState().userReducer.user,
        getState().userReducer.quiz
      )
        .then(response => {
          dispatch(Actions.continueButton(Actions.AsyncState.Success));
        })
        .catch(() =>
          dispatch(Actions.continueButton(Actions.AsyncState.Failure))
        );
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
        dispatch(Actions.signUpSuccess(name));
      });
    }
  };
}
