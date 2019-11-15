import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Stattistics from "../components/Stattistics";
import pages from "../pages";
import modalKinds from "../ModlKind";
Enzyme.configure({ adapter: new Adapter() });

 
const state ={
  quiz:[{
    quesion:"a",
    answer:["c","d","s"],
    correctAnswer: "cor"
  },
  {
    quesion:"ab",
    answer:["c","d","s"],
    orrectAnswer: "cor2"
  }],
  highlight:'none',
  page:pages.Statistics,
  userStat:[{'QuizId':1},{'QuizId':3}],
  answerOptions:[],
  resultList:[]
}

describe("Stattistics", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<Stattistics {...state} submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    console.log(wrapper.debug())

    expect(wrapper).toMatchSnapshot();
  });

  it("State page is correct", () => {
    expect(state.page).toBe(pages.Statistics);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Stattistics {...state} />, div);
  });

  it('should show text', ()=>{
    const text = wrapper.find({ id: "quizNumber" });
    expect(text.text()).toBe("QUIZ 1");
  })

  it('should find one button for guest', () => {     
    const numOfQuetions = wrapper.find({id: "quizNumber"})
       expect(numOfQuetions).toHaveLength(2);
        });  

 
});


      
  