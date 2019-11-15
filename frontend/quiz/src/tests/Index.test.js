import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "../index";
import pages from "../pages";
import modalKinds from "../ModlKind";
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
  dropdownshow: 0,
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

  it('should show text', ()=>{
    const text = wrapper.find({ id: "guest" });
    expect(text.text()).toBe("LOGIN AS GUEST");
  })

      
});

  /*------------------------------------------------------------------------------------*/

  

// describe("When the first answer is selected", () =>{
//   let wrapper;
//   const handleAnswersSelecter = jest.fn();

//   beforeAll(()=> {
//     wrapper = mount(<QuizStep {...state} onAnswerSelected={()=>{}}/>);
//     wrapper.find.apply('.kAnswer').first().simulate('click');
//   });

//   it('onAnswerselected should be called', () => {
//       expect(handleAnswersSelecter).toHaveBeenCalled();
//   });

//   it("should receive c", ()=>{
//     expect(handleAnswersSelecter).toHaveBeenCalledWith("c");
//   })
//   });

 

// it('should have no background color', () => {     
//   expect(wrapper.find({id: "username"}).props().style.backgroundColor).toBe('white');
// });  