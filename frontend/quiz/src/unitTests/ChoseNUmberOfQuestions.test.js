import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ChoseNUmberOfQuestions from "../components/ChoseNUmberOfQuestions";
import pages from "../JS/pages";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
Enzyme.configure({ adapter: new Adapter() });

const state = {
  quiz: [
    {
      question: "a",
      answer: ["c", "d", "s"],
      correctAnswer: "cor"
    },
    {
      question: "ab",
      answer: ["c", "d", "s"],
      CorrectAnswer: "cor2"
    }
  ],
  highlight: "none",
  page: pages.Login,
  answerOptions: []
};

describe.skip("Choose number of questions", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <ChoseNUmberOfQuestions submit={mockSubmit} />
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Page is correct", () => {
    expect(state.page).toBe(pages.Login);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ChoseNUmberOfQuestions {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "startButton" });
    expect(text.text()).toBe("START THE QUIZ");
  });
});
