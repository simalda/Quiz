import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuizStep from './components/QuizStep';
import LogInPage from './components/LogInPage';
// import { shallowToJson } from 'enzyme-to-json';
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
  page:-1,
  answerOptions:[]
}

describe("Enter as a guest switch page", ()=>{
  test("Enter as a guest switch page"), ()=>{
except (this.state.page).toBe(1);
  }
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

describe("Quiz", () =>{
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuizStep {...state} onAnswerSelected={()=>{}}/>, div);
  
});
});

describe("When no answer has been selected", () =>{
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<QuizStep {...state} nAnswerSelected={()=>{}}/>);
  });

  it('should have no background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');     
  });
  });
  
describe("When the wrong answer has been selected", () =>{
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<QuizStep {...(Object.assign({},state,{highlight: 'wrong'}))} nAnswerSelected={()=>{}}/>);
  });

  it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');     
  });
  });

describe("When the correct answer has been selected", () =>{
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<QuizStep {...(Object.assign({},state,{highlight: 'correct'}))} nAnswerSelected={()=>{}}/>);
    });
  
    it('should have red background color', () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');     
    });
    });

describe("When the first answer is selected", () =>{
  let wrapper;
  const handleAnswersSelecter = jest.fn();

  beforeAll(()=> {
    wrapper = mount(<QuizStep {...state} onAnswerSelected={()=>{}}/>);
    wrapper.find.apply('.kAnswer').first().simulate('click');
  });

  it('onAnswerselected should be called', () => {
      expect(handleAnswersSelecter).toHaveBeenCalled();     
  });

  it("should receive c", ()=>{
    expect(handleAnswersSelecter).toHaveBeenCalledWith("c");
  })
  });
    