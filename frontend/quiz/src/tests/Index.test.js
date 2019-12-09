import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "../components/App";
import pages from "../JS/pages";
import modalKinds from "../JS/ModalKind";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  page: pages.Login,
  lang: "",
  quiz: [],
  isAnswerSelected: 0,
  question: undefined,
  answerOptions: undefined,
  selectedAnswer: "",
  numberOfQuestions: 0,
  numberOfCurrentQuestion: 0,
  numberOfCorrectAnswers: 0,
  user: "guest",
  modal: modalKinds.Nothing,
  userStat: ""
};

describe("Index", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<App submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("State page is correct", () => {
    expect(state.page).toBe(pages.Login);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "guest" });
    expect(text.text()).toBe("LOGIN AS GUEST");
  });
});

/*------------------------------------------------------------------------------------*/
