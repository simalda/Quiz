import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Statistics from "../components/Statistics";
import pages from "../JS/pages";
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
  page: pages.Statistics,
  userStat: [{ QuizId: 1 }, { QuizId: 3 }],
  answerOptions: [],
  resultList: []
};

describe("Statistics", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<Statistics {...state} submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    console.log(wrapper.debug());

    expect(wrapper).toMatchSnapshot();
  });

  it("State page is correct", () => {
    expect(state.page).toBe(pages.Statistics);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Statistics {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "quizNumber" });
    expect(text.text()).toBe("QUIZ 1");
  });

  it("should find one button for guest", () => {
    const numOfQuestions = wrapper.find({ id: "quizNumber" });
    expect(numOfQuestions).toHaveLength(2);
  });
});
