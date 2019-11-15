import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuizStep from '../components/QuizStep';
import AnswerOptions from "../components/AnswerOptions";
import pages from "../pages";
import ContinueButton from "../components/ContinueButton";

Enzyme.configure({ adapter: new Adapter() });



const state ={
  quiz:[{
    quesion:"a",
    answer:["c","d","s"],
    correctAnswer: "cor"
    }  ],
  highlight:'none',
  page:pages.Main,
  numberOfCurrentQuestion:1,
  question:"a",
    answerOptions:["c","d","s","a"]
}

describe("Quiz step", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<QuizStep {...state} submit={mockSubmit} />);
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

  it('should show text', ()=>{
    const text = wrapper.find({ id: "question1" });
    expect(text.text()).toBe(state.question);
  })

  // it('should find one button for guest', () => {     
  //   const butto = wrapper.find({id: "answer"})
  //      expect(butto).toHaveLength(4);
  //       });  

        it('should find continue button', () => {     
          const butto = wrapper.find('ContinueButton')
             expect(butto).toHaveLength(1);
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
    