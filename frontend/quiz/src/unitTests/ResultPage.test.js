import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ResultPage from "../components/ResultPage";
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
      correctAnswer: "cor2"
    }
  ],
  highlight: "none",
  page: pages.Login,
  answerOptions: []
};

describe.skip("Result page", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <ResultPage submit={mockSubmit} />
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
    ReactDOM.render(<ResultPage {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "startQuizButton" });
    expect(text.text()).toBe("START NEW QUIZ");
  });
});
