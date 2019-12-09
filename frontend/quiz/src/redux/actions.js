/*
 * action types
 */
export const ENTER_AS_GUEST = "ENTER_AS_GUEST";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const PAGE_ABOUT_US = "PAGE_ABOUT_US";
export const CHOOSE_LANG = "CHOOSE_LANG";
export const LANG = "LANG";
export const ANSWER_SELECTED = "ANSWER_SELECTED";
export const GET_STAT = "GET_STAT";
export const SELECTED_ANSWER = "SELECTED_ANSWER";
export const NUMBER_OF_CORRECT_ANSWERS = "NUMBER_OF_CORRECT_ANSWERS";
export const SET_ANSWER_OPTIONS = "SET_ANSWER_OPTIONS";
export const SET_CORRECT_ANSWER = "SET_CORRECT_ANSWER";
export const SET_QUESTION = "SET_QUESTION";
export const SET_QUIZ = "SET_QUIZ";
export const CONTINUE_BUTTON_CLICKED = "CONTINUE_BUTTON_CLICKED";
/* thunk action types*/
export const LOGIN = "LOGIN";
export const STAT = "STAT";
export const NUMBER_OF_QUESTIONS = "NUMBER_OF_QUESTIONS";
export const CONTINUE_BUTTON_LAST_QUESTION = "CONTINUE_BUTTON_LAST_QUESTION";
export const SIGN_UP_MODAL = "SIGN_UP_MODAL";
export const EMAIL_WRONG = "EMAIL_WRONG";
export const PASS_NOT_EQUAL = "PASS_NOT_EQUAL";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

/*
 * other constants
 */

/*
 * action creators
 */
export function setGuestUser(user) {
  return { type: ENTER_AS_GUEST, user };
}

export function setLanguage(language) {
  return {
    type: CHOOSE_LANG,
    language
  };
}

export function closeModal(user) {
  return {
    type: CLOSE_MODAL,
    user
  };
}

export function getStat() {
  return {
    type: GET_STAT
  };
}

export function onAnswerSelectedCheckbox() {
  return {
    type: ANSWER_SELECTED
  };
}
export function SelectAnswer(chosenAnswer) {
  return {
    type: SELECTED_ANSWER,
    chosenAnswer
  };
}

export function continueButton() {
  return {
    type: CONTINUE_BUTTON_CLICKED
  };
}

export function signUp() {
  return {
    type: SIGN_UP_MODAL
  };
}
export function emailNotValid() {
  return {
    type: EMAIL_WRONG
  };
}
export function TwoPassAreNotEqual() {
  return {
    type: PASS_NOT_EQUAL
  };
}
export const AsyncState = {
  Started: "Started",
  Success: "Success",
  Failure: "Failure"
};

export function login(asyncState, user, isWrongCredential = false) {
  return {
    type: LOGIN,
    asyncState,
    user,
    isWrongCredential
  };
}

export function statistics(asyncState, userStatistics = undefined) {
  return {
    type: STAT,
    asyncState,
    userStatistics
  };
}

export function chooseNumberOfQuestion(asyncState, numberOfQuestions, lang) {
  return {
    type: NUMBER_OF_QUESTIONS,
    asyncState,
    numberOfQuestions,
    lang
  };
}

export function creatQuizSuccess(response) {
  let quiz = response;
  let numberOfCurrentQuestion = 0;
  return {
    type: SET_QUIZ,
    quiz,
    numberOfCurrentQuestion
  };
}
export function signUpSuccess(response) {
  return {
    type: SIGN_UP_SUCCESS,
    name: response
  };
}
export function continueButtonLast(asyncState) {
  return {
    type: CONTINUE_BUTTON_LAST_QUESTION,
    asyncState
  };
}
