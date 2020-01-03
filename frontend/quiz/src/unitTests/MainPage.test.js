import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import pages from "../JS/pages";
import MainPage from "../components/MainPage";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
// const mockStore = configureMockStore();
// const store = mockStore({});
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
  page: pages.Main,
  answerOptions: []
};
const store = {
  user: "guest"
};
describe.skip("Main Page", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <MainPage submit={mockSubmit} />
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Main page", () => {
  it("Page is correct", () => {
    expect(state.page).toBe(pages.Main);
  });

  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
      div
    );
  });
});
