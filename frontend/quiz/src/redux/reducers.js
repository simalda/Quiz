import { combineReducers } from "redux";

import pages from "../JS/pages";
import modalKinds from "../JS/ModalKind";

import history from "../JS/history";

import {
  ENTER_AS_GUEST,
  CLOSE_MODAL,
  PAGE_ABOUT_US,
  CHOOSE_LANG,
  NUMBER_OF_QUESTIONS,
  CONTINUE_BUTTON_CLICKED,
  CONTINUE_BUTTON_LAST_QUESTION,
  STAT,
  SELECTED_ANSWER,
  NUMBER_OF_CORRECT_ANSWERS,
  LOGIN,
  SIGN_UP_MODAL,
  SET_QUIZ,
  EMAIL_WRONG,
  PASS_NOT_EQUAL,
  SIGN_UP_SUCCESS
} from "./actions";

function languageReducer(state = { lang: "" }, action) {
  switch (action.type) {
    case CHOOSE_LANG:
      return {
        ...state,
        lang: action.language
      };
    case NUMBER_OF_QUESTIONS:
      return {
        ...state,
        lang: action.lang
      };

    default:
      return state;
  }
}

function numberOfCorrectAnswersReducer(state = { title: undefined }, action) {
  switch (action.type) {
    case NUMBER_OF_CORRECT_ANSWERS:
      return {
        ...state,
        numberOfCorrectAnswers:
          action.title === state.correctAnswer
            ? state.numberOfCorrectAnswers + 1
            : state.numberOfCorrectAnswers
      };
    default:
      return state;
  }
}

function numberOfQuestionsReducer(state = { numberOfQuestions: 0 }, action) {
  switch (action.type) {
    case NUMBER_OF_QUESTIONS:
      return {
        ...state,
        numberOfQuestions: action.numberOfQuestions
      };
    case CONTINUE_BUTTON_LAST_QUESTION:
      return {
        ...state,
        numberOfQuestions: 0
      };
    default:
      return state;
  }
}

function setQuizReducer(
  state = {
    quiz: [],
    numberOfCurrentQuestion: 0,
    question: "",
    correctAnswer: "",
    answerOptions: [],
    chosenAnswer: "",
    isAnswerSelected: 0,
    numberOfCorrectAnswers: 0
  },
  action
) {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
        question: action.quiz[state.numberOfCurrentQuestion].question,
        correctAnswer: action.quiz[state.numberOfCurrentQuestion].correctAnswer,
        answerOptions: action.quiz[state.numberOfCurrentQuestion].answerOptions
      };
    case CONTINUE_BUTTON_CLICKED:
      return {
        ...state,
        numberOfCurrentQuestion: state.numberOfCurrentQuestion + 1,
        question: state.quiz[state.numberOfCurrentQuestion + 1].question,
        correctAnswer:
          state.quiz[state.numberOfCurrentQuestion + 1].correctAnswer,
        answerOptions:
          state.quiz[state.numberOfCurrentQuestion + 1].answerOptions,
        isAnswerSelected: 0
      };
    case SELECTED_ANSWER:
      if (state.isAnswerSelected === 0) {
        state = {
          ...state,
          chosenAnswer: action.chosenAnswer,
          isAnswerSelected: 1,
          numberOfCorrectAnswers:
            action.chosenAnswer === state.correctAnswer
              ? state.numberOfCorrectAnswers + 1
              : state.numberOfCorrectAnswers
        };
        state.quiz[state.numberOfCurrentQuestion].chosenAnswer =
          action.chosenAnswer;

        return state;
      }
    default:
      return state;
  }
}

function userReducer(
  state = { user: "guest", modal: modalKinds.Nothing },
  action
) {
  switch (action.type) {
    case ENTER_AS_GUEST:
      return {
        ...state,
        user: action.user
      };
    case CLOSE_MODAL:
      history.push("/");
      return {
        ...state,
        modal: modalKinds.Nothing,
        user: action.user
      };
    case LOGIN:
      if (action.asyncState === "Success") {
        return {
          ...state,
          modal: modalKinds.Nothing,
          user: action.user
        };
      }
      if (action.asyncState === "Failure") {
        return {
          ...state,
          modal: modalKinds.WrongParameters
        };
      } else {
        return state;
      }
    case SIGN_UP_MODAL:
      return {
        ...state,
        modal: modalKinds.OpenSignup
      };
    case PASS_NOT_EQUAL:
      return {
        ...state,
        modal: modalKinds.TwoPassAreNotEqual
      };
    case EMAIL_WRONG:
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        modal: modalKinds.Nothing,
        user: action.user
      };

    default:
      return state;
  }
}

function AboutUs(state = [], action) {
  switch (action.type) {
    case PAGE_ABOUT_US:
      return [
        ...state,
        {
          page: pages.AboutUs
        }
      ];
    default:
      return state;
  }
}

function getStatReducer(state = { user: "guest" }, action) {
  switch (action.type) {
    case STAT:
      return {
        ...state,
        userStat: action.statData,
        page: pages.Statistics
      };
    default:
      return state;
  }
}

export const appState = combineReducers({
  userReducer,
  //SignupReducer,
  AboutUs,
  languageReducer,
  numberOfQuestionsReducer,
  setQuizReducer,
  getStatReducer,
  numberOfCorrectAnswersReducer
});
