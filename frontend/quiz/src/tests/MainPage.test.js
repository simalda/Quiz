import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import pages from "../pages";
import MainPage from "../components/MainPage";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  quiz: [
    {
      quesion: "a",
      answer: ["c", "d", "s"],
      correctAnswer: "cor"
    },
    {
      quesion: "ab",
      answer: ["c", "d", "s"],
      orrectAnswer: "cor2"
    }
  ],
  highlight: "none",
  page: pages.Main,
  answerOptions: []
};

describe("ControlledForm", () => {
    let wrapper;
    let mockSubmit;
    beforeEach(() => {
      mockSubmit = jest.fn();
      wrapper = shallow(<MainPage submit={mockSubmit} />);
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
    ReactDOM.render(<MainPage {...state} />, div);
  });

});
//   it('should have white text', () => {
//     const wrapper
//     beforeAll(()=> {
//        wrapper = mount(<MainPage {...state} />);
//     });
//     expect(wrapper.find(".button").props().style.color).toBe('white');
//     });

 

// it('should render a document title', () => {
//     const wrapper = shallow(
//         <DocumentTitle title="Events" />
//     );
//     expect(wrapper.prop('title')).toEqual('Events');
// });

// it('should render a document title and a parent title', () => {
//     const wrapper = shallow(
//         <DocumentTitle title="Events" parent="Event Radar" />
//     );
//     expect(wrapper.prop('title')).toEqual('Events — Event Radar');
// });
// });

 
/*------------------------------------------------------------------------------------*/


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


// it("should render correctly", () => {
//     const output = shallow(<LogInPage />);
//     expect(shallowToJson(output)).toMatchSnapshot();
//   });