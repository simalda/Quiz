import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuizStep from "../components/QuizStep";
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
    }
  ],
  highlight: "none",
  page: pages.Main,
  numberOfCurrentQuestion: 1,
  question: "a",
  answerOptions: ["c", "d", "s", "a"]
};

describe.skip("Quiz step", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <QuizStep submit={mockSubmit} />
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("State page is correct", () => {
    expect(state.page).toBe(pages.Main);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<QuizStep {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "question1" });
    expect(text.text()).toBe(state.question);
  });

  // it('should find one button for guest', () => {
  //   const button = wrapper.find({id: "answer"})
  //      expect(button).toHaveLength(4);
  //       });

  it("should find continue button", () => {
    const button = wrapper.find("ContinueButton");
    expect(button).toHaveLength(1);
  });
});

/*------------------------------------------------------------------------------------*/
// describe('Index', () => {
//   it('should render correctly', () => {
//     const output = shallow(
//       <LogInPage   />
//     );
//     expect(shallowToJson(output)).toMatchSnapshot();
//   });
// });

// describe("Quiz", () =>{
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<QuizStep {...state} onAnswerSelected={()=>{}}/>, div);

// });
// });

// describe("When no answer has been selected", () =>{
//   let wrapper;
//   beforeAll(()=> {
//     wrapper = mount(<QuizStep {...state} nAnswerSelected={()=>{}}/>);
//   });

//   it('should have no background color', () => {
//       expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
//   });
//   });

// describe("When the wrong answer has been selected", () =>{
//   let wrapper;
//   beforeAll(()=> {
//     wrapper = mount(<QuizStep {...(Object.assign({},state,{highlight: 'wrong'}))} nAnswerSelected={()=>{}}/>);
//   });

//   it('should have red background color', () => {
//       expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
//   });
//   });

// describe("When the correct answer has been selected", () =>{
//     let wrapper;
//     beforeAll(()=> {
//       wrapper = mount(<QuizStep {...(Object.assign({},state,{highlight: 'correct'}))} nAnswerSelected={()=>{}}/>);
//     });

//     it('should have red background color', () => {
//         expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
//     });
//     });

// describe("When the first answer is selected", () =>{
//   let wrapper;
//   const handleAnswersSelector = jest.fn();

//   beforeAll(()=> {
//     wrapper = mount(<QuizStep {...state} onAnswerSelected={()=>{}}/>);
//     wrapper.find.apply('.kAnswer').first().simulate('click');
//   });

//   it('onAnswerSelected should be called', () => {
//       expect(handleAnswersSelector).toHaveBeenCalled();
//   });

//   it("should receive c", ()=>{
//     expect(handleAnswersSelecter).toHaveBeenCalledWith("c");
//   })
//   });
